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
import { TrackingLesson } from "../entities/TrackingLesson";

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

  @Mutation(() => TrackingLesson, { nullable: true })
  async trackLesson(
    @Arg("lessonId", () => Number) lessonId: number,
    @Arg("time", () => Number) time: number,
    @Ctx() { req }: MyContext
  ): Promise<TrackingLesson | null> {
    if (req.session.userId) {
      let track;
      try {
        track = await TrackingLesson.create({
          userId: req.session.userId,
          lessonId,
          time,
        }).save();
        req.session.lesson = lessonId;
      } catch (err) {
        return null;
      }
      return track;
    }
    return null;
  }

  @Query(() => Lesson, { nullable: true })
  latestLesson(@Ctx() { req }: MyContext): Promise<Lesson | undefined> {
    return Lesson.findOne(req.session.lessonId, {
      relations: ["track"],
    });
  }

  @Query(() => Lesson, { nullable: true })
  lesson(
    @Arg("lessonId", () => Int) lessonId: number
  ): Promise<Lesson | undefined> {
    return Lesson.findOne(lessonId, {
      relations: ["resource", "track"],
    });
  }
}
