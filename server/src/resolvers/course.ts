import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Course } from "../entities/Course";

@ObjectType()
class PaginatedCourse {
  @Field(() => [Course])
  courses: Course[];
  @Field()
  hasMore: boolean;
}

@Resolver(Course)
export class CourseResolver {
  @Query(() => Course, { nullable: true })
  course(@Arg("id", () => Int) id: number) {
    return Course.findOne(id, {
      relations: ["section"],
    });
  }

  @Query(() => PaginatedCourse)
  async courses(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Date, { nullable: true }) cursor: string | null
  ): Promise<PaginatedCourse> {
    const realLimit = Math.min(20, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(cursor);
    }

    const courses = await getConnection().query(
      `
        select * from course
        ${cursor ? `where "createdAt" < $2` : ""}
        order by "createdAt" DESC
        limit $1
      `,
      replacements
    );

    return {
      courses: courses.slice(0, realLimit),
      hasMore: courses.length === realLimitPlusOne,
    };
  }
}
