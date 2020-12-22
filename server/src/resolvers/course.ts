import { Query, Resolver } from "type-graphql";
import { Course } from "../entities/Course";

@Resolver(Course)
export class CourseResolver {
  @Query(() => Course, { nullable: true })
  course() {}

  @Query(() => [Course])
  courses() {}
}
