import { FeedBack } from "../entities/FeedBack";
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
import { Lesson } from "../entities/Lesson";
import { Section } from "../entities/Section";
import { MyContext } from "../types";

@ObjectType()
class TrackingResponse {
  @Field(() => Number)
  id: Number;
  @Field(() => Number)
  time: Number;
  @Field(() => String)
  name: String;
}

@Resolver(Lesson)
export class LessonResolver {
  @FieldResolver(() => String)
  async name(@Root() lesson: Lesson, @Ctx() { req, translate }: MyContext) {
    if (req.session.language === "vi") {
      const response = await translate.translate(
        lesson.name,
        req.session.language
      );
      return response[0];
    }
    return lesson.name;
  }

  @FieldResolver(() => String)
  async captionName(
    @Root() lesson: Lesson,
    @Ctx() { req, translate }: MyContext
  ) {
    if (req.session.language === "vi") {
      const response = await translate.translate(
        lesson.captionName,
        req.session.language
      );
      return response[0];
    }
    return lesson.captionName;
  }

  @FieldResolver(() => String)
  async content(@Root() lesson: Lesson, @Ctx() { req, translate }: MyContext) {
    if (req.session.language === "vi") {
      const response = await translate.translate(
        lesson.content,
        req.session.language
      );
      return response[0];
    }
    return lesson.content;
  }

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

  @FieldResolver(() => Section)
  section(@Root() lesson: Lesson) {
    return Section.findOne(lesson.sectionId);
  }

  @Mutation(() => TrackingResponse)
  track(
    @Arg("lessonId") lessonId: number,
    @Arg("time") time: number,
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ): TrackingResponse {
    req.session.track = {
      id: lessonId,
      time,
      name,
    };
    return {
      id: lessonId,
      name,
      time,
    };
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
