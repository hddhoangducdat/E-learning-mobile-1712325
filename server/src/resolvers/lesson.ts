import { FeedBack } from "../entities/FeedBack";
import {
  Arg,
  Field,
  FieldResolver,
  Int,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Lesson } from "../entities/Lesson";

@Resolver(Lesson)
export class LessonResolver {
  @Query(() => [Lesson])
  async lessons(
    @Arg("sectionId", () => Number) sectionId: number
  ): Promise<Lesson[]> {
    const lessons = await getConnection().query(
      `
        select * from lesson
        where "sectionId" = $1
        order by id 
      `,
      [sectionId]
    );

    return lessons;
  }

  @Query(() => Lesson, { nullable: true })
  lesson(
    @Arg("lessonId", () => Int) lessonId: number
  ): Promise<Lesson | undefined> {
    return Lesson.findOne(lessonId, {
      relations: ["resource"],
    });
  }
}
