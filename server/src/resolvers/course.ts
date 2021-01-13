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
import { FieldError } from "./FieldError";
import { Category } from "../entities/Category";

@ObjectType()
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

  @Query(() => PaginatedCourse)
  async courses(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Date, { nullable: true }) cursor: string | null,
    @Arg("categoryId", () => Number, { nullable: true })
    categoryId: number | null,
    @Arg("isAsc", () => Boolean, { nullable: true }) isAsc: boolean | null,
    @Arg("orderType", () => String, { nullable: true })
    orderType: "BEST_SELLER" | "RATE" | null,
    @Arg("search", () => String, { nullable: true }) search: string | null
  ): Promise<PaginatedCourse> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    let where: string[] = [];

    if (cursor) {
      replacements.push(cursor);
      where.push(`"createdAt" < $${replacements.length}`);
    }

    if (search) {
      const listSearch = search.toLowerCase().split(" ");
      let query = `title LIKE ('${"%" + search + "%"}'`;
      if (listSearch.length !== 1) {
        listSearch.map((value) => {
          if (value.length > 2) {
            query += ` OR title LIKE '${"%" + value + "%"}'`;
          }
        });
      }
      where.push(query + ")");
    }

    if (categoryId) {
      replacements.push(categoryId);
      where.push(`"categoryId" = $${replacements.length}`);
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
        select * from course
        ${query.length === 0 ? "" : "where " + query}
        order by "${order}" ${isAsc ? "ASC" : "DESC"}
        limit $1
      `,
      replacements
    );

    return {
      courses: courses.slice(0, realLimit),
      hasMore: courses.length === realLimitPlusOne,
    };
  }

  @Mutation(() => Boolean)
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
      return true;
    }
    return false;
  }
}
