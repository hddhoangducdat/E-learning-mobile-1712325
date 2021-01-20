import { StudentCourse } from "../entities/StudentCourse";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Course } from "../entities/Course";
import { Category } from "../entities/Category";
import { TrackingCourse } from "../entities/TrackingCourse";

@ObjectType({ isAbstract: true })
class PaginatedCourse {
  @Field(() => [Course])
  courses: Course[];
  @Field()
  hasMore: boolean;
}

@Resolver(Course)
export class CourseResolver {
  @FieldResolver(() => String)
  async title(@Root() course: Course, @Ctx() { req, translate }: MyContext) {
    if (req.session.language === "vi") {
      const response = await translate.translate(
        course.title,
        req.session.language
      );
      return response[0];
    }
    return course.title;
  }

  @Query(() => [String])
  getHistory(@Ctx() { req }: MyContext) {
    if (req.session.history) {
      return req.session.history;
    }
    return [];
  }

  @Mutation(() => Boolean)
  saveHistory(
    @Arg("search", () => String) search: string,
    @Ctx() { req }: MyContext
  ) {
    try {
      if (!req.session.history) req.session.history = [];
      if (req.session.history && !req.session.history.includes(search)) {
        if (req.session.history.length === 5) req.session.history.shift();
        req.session.history.push(search);
      } else {
        req.session.history = [search];
      }
    } catch (err) {}
    return true;
  }

  @Mutation(() => Boolean)
  removeHistory(
    @Arg("search", () => String) search: string,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.history) req.session.history = [];
    req.session.history = req.session.history.filter(
      (text: string) => text !== search
    );

    return true;
  }

  @FieldResolver(() => String)
  async subtitle(@Root() course: Course, @Ctx() { req, translate }: MyContext) {
    if (req.session.language === "vi") {
      const response = await translate.translate(
        course.subtitle,
        req.session.language
      );
      return response[0];
    }
    return course.subtitle;
  }

  @FieldResolver(() => String)
  async description(
    @Root() course: Course,
    @Ctx() { req, translate }: MyContext
  ) {
    if (req.session.language === "vi") {
      const response = await translate.translate(
        course.description,
        req.session.language
      );
      return response[0];
    }
    return course.description;
  }

  @FieldResolver(() => String)
  async requirement(
    @Root() course: Course,
    @Ctx() { req, translate }: MyContext
  ) {
    if (req.session.language === "vi") {
      const response = await translate.translate(
        course.requirement,
        req.session.language
      );
      return response[0];
    }
    return course.requirement;
  }

  @FieldResolver(() => String)
  async learnWhat(
    @Root() course: Course,
    @Ctx() { req, translate }: MyContext
  ) {
    if (req.session.language === "vi") {
      const response = await translate.translate(
        course.learnWhat,
        req.session.language
      );
      return response[0];
    }
    return course.learnWhat;
  }

  @Query(() => Boolean)
  async isOwn(
    @Arg("courseId", () => Int) courseId: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const studentCourse = await StudentCourse.findOne({
      where: {
        userId: req.session.userId,
        courseId,
      },
    });
    if (studentCourse) {
      return true;
    }
    return false;
  }

  @FieldResolver(() => Category)
  category(@Root() course: Course) {
    return Category.findOne(course.categoryId);
  }

  @Query(() => Course, { nullable: true })
  async course(@Arg("id", () => Int) id: number) {
    let course = await Course.findOne(id, { relations: ["section"] });
    return course;
  }

  @Query(() => TrackingCourse, { nullable: true })
  async getTrackCourse(
    @Arg("courseId", () => Int) courseId: number,
    @Ctx() { req }: MyContext
  ) {
    if (req.session.userId) {
      const track = await TrackingCourse.findOne({
        where: {
          userId: req.session.userId,
          courseId,
        },
      });
      console.log(track);
      return track;
    }
    return null;
  }

  @Mutation(() => Boolean)
  async removeTrackCourse(
    @Arg("courseId", () => Int) courseId: number,
    @Ctx() { req }: MyContext
  ) {
    if (req.session.userId) {
      await TrackingCourse.delete({
        userId: req.session.userId,
        courseId,
      });
      return true;
    }
    return false;
  }

  @Query(() => [Course])
  async recommend(@Ctx() { req }: MyContext) {
    let str: string = "";
    if (req.session.history) {
      req.session.history.forEach((h: string, i: number) => {
        if (i === 0) str += `c.title LIKE '%${h}%'`;
        else str += `or c.title LIKE '%${h}%'`;
      });
    }
    const courses = await getConnection().query(
      `
        select c.id, c.title, c.subtitle, c.price, c.description,
        c.requirement, c."learnWhat", c."soldNumber", c."videoNumber", c."rateNumber",
        c."totalHours", c."promoVidUrl", c."formalityPoint", c."contentPoint", 
        c."presentationPoint", c."instructorId", c."imageUrl", c."createdAt", c."categoryId"
        ${req.session.userId ? `, f."userId"` : ""}        
        from course c
        ${
          req.session.userId
            ? `left join favorite f on f."courseId" = c.id and f."userId"=` +
              req.session.userId
            : ""
        }
        where 
        ${req.session.history ? str : `c."rateNumber" > 4`}
        order by c."soldNumber" DESC
        limit 10
      `
    );

    return courses.map((course: any, index: number) => {
      return {
        ...course,
        favorite: {
          userId: course.userId ? course.userId : -1,
        },
      };
    });
  }

  @Query(() => PaginatedCourse)
  async coursesPresent(
    @Arg("limit", () => Int) limit: number,
    @Arg("categoryId", () => Number, { nullable: true })
    categoryId: number | null,
    @Arg("isAsc", () => Boolean, { nullable: true }) isAsc: boolean | null,
    @Arg("orderType", () => String, { nullable: true })
    orderType: "BEST_SELLER" | "RATE" | null,
    @Arg("search", () => String, { nullable: true }) search: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedCourse> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    let where: string[] = [];

    if (search) {
      const listSearch = search.toLowerCase().split(" ");
      let query = `c.title LIKE '${"%" + search + "%"}'`;
      if (listSearch.length !== 1) {
        listSearch.map((value) => {
          if (value.length > 2) {
            query += ` OR c.title LIKE '${"%" + value + "%"}'`;
          }
        });
      }
      where.push(query);
    }

    if (categoryId) {
      replacements.push(categoryId);
      where.push(`c."categoryId" = $${replacements.length}`);
    }

    let order;

    switch (orderType) {
      case "BEST_SELLER":
        order = "soldNumber";
        break;
      case "RATE":
        order = "rateNumber";
        break;
      default:
        order = "createdAt";
    }

    let query = "";

    where.map((value, index) => {
      query += index === 0 ? value : " AND " + value;
    });

    const courses = await getConnection().query(
      `
        select c.id, c.title, c.subtitle, c.price, c.description,
        c.requirement, c."learnWhat", c."soldNumber", c."videoNumber", c."rateNumber",
        c."totalHours", c."promoVidUrl", c."formalityPoint", c."contentPoint", 
        c."presentationPoint", c."instructorId", c."imageUrl", c."createdAt", c."categoryId"
        ${req.session.userId ? `, f."userId"` : ""}      
        from course c
        ${
          req.session.userId
            ? `left join favorite f on f."courseId" = c.id and f."userId"=` +
              req.session.userId
            : ""
        }
        ${query.length === 0 ? "" : "where " + query}
        order by c."${order}" ${isAsc ? "ASC" : "DESC"}
        limit $1
      `,
      replacements
    );

    return {
      courses: courses
        .map((course: any) => {
          return {
            ...course,
            favorite: {
              userId: course.userId ? course.userId : -1,
            },
          };
        })
        .slice(0, realLimit),
      hasMore: courses.length === realLimitPlusOne,
    };
  }

  @Query(() => PaginatedCourse)
  async courses(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Date, { nullable: true }) cursor: string | null,
    @Arg("categoryId", () => Number, { nullable: true })
    categoryId: number | null,
    @Arg("isAsc", () => Boolean, { nullable: true }) isAsc: boolean | null,
    @Arg("orderType", () => String, { nullable: true })
    orderType: "BEST_SELLER" | "RATE" | null,
    @Arg("search", () => String, { nullable: true }) search: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedCourse> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    let where: string[] = [];

    if (cursor) {
      replacements.push(cursor);
      where.push(`c."createdAt" < $${replacements.length}`);
    }

    if (search) {
      const listSearch = search.toLowerCase().split(" ");
      let query = `c.title LIKE '${"%" + search + "%"}'`;
      if (listSearch.length !== 1) {
        listSearch.map((value) => {
          if (value.length > 2) {
            query += ` OR c.title LIKE '${"%" + value + "%"}'`;
          }
        });
      }
      where.push(query);
    }

    if (categoryId) {
      replacements.push(categoryId);
      where.push(`c."categoryId" = $${replacements.length}`);
    }

    let order;

    switch (orderType) {
      case "BEST_SELLER":
        order = "soldNumber";
        break;
      case "RATE":
        order = "rateNumber";
        break;
      default:
        order = "createdAt";
    }

    let query = "";

    where.map((value, index) => {
      query += index === 0 ? value : " AND " + value;
    });

    const courses = await getConnection().query(
      `
        select c.id, c.title, c.subtitle, c.price, c.description,
        c.requirement, c."learnWhat", c."soldNumber", c."videoNumber", c."rateNumber",
        c."totalHours", c."promoVidUrl", c."formalityPoint", c."contentPoint", 
        c."presentationPoint", c."instructorId", c."imageUrl", c."createdAt", c."categoryId"
        ${req.session.userId ? `, f."userId"` : ""}    
        from course c
        ${
          req.session.userId
            ? `left join favorite f on f."courseId" = c.id and f."userId"=` +
              req.session.userId
            : ""
        }
        ${query.length === 0 ? "" : "where " + query}
        order by c."${order}" ${isAsc ? "ASC" : "DESC"}
        limit $1
      `,
      replacements
    );

    return {
      courses: courses
        .map((course: any) => {
          return {
            ...course,
            favorite: {
              userId: course.userId ? course.userId : -1,
            },
          };
        })
        .slice(0, realLimit),
      hasMore: courses.length === realLimitPlusOne,
    };
  }

  @Mutation(() => TrackingCourse, { nullable: true })
  async trackCourse(
    @Arg("courseId", () => Number) courseId: number,
    @Arg("lessonId", () => Number) lessonId: number,
    @Ctx() { req }: MyContext
  ): Promise<TrackingCourse | null> {
    if (req.session.userId) {
      let track = await TrackingCourse.findOne({
        where: {
          userId: req.session.userId,
          courseId: courseId,
        },
      });
      if (track) {
        await TrackingCourse.update(
          { courseId, userId: req.session.userId },
          {
            lessonId,
          }
        );
        track.lessonId = lessonId;
        return track;
      } else {
        try {
          track = await TrackingCourse.create({
            userId: req.session.userId,
            courseId,
            lessonId,
          }).save();
        } catch (err) {
          return null;
        }
        return track;
      }
    }
    return null;
  }

  @Mutation(() => Course, { nullable: true })
  async purchase(
    @Arg("courseId", () => Number) courseId: number,
    @Ctx() { req }: MyContext
  ) {
    if (req.session.userId) {
      await getConnection().query(
        `
          insert into student_course ("userId", "courseId")
          values ($1, $2)
        `,
        [req.session.userId, courseId]
      );
      const course = await Course.find({
        where: {
          id: courseId,
        },
      });
      console.log(course);
      return course[0];
    } else return null;
  }

  @Query(() => [Course], { nullable: true })
  async myCourse(@Ctx() { req }: MyContext): Promise<null | Course[]> {
    if (req.session.userId) {
      const courses = await getConnection().query(
        `
          select * from course c
          inner join student_course sc on sc."courseId" = c.id
          where sc."userId" = $1
        `,
        [req.session.userId]
      );
      return courses;
    }
    return null;
  }
}
