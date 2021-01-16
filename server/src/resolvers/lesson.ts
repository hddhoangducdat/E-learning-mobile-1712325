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
      let track = await TrackingLesson.findOne({
        where: {
          userId: req.session.userId,
          lessonId,
        },
      });
      if (track) {
        await TrackingLesson.update(
          {
            userId: req.session.userId,
            lessonId,
          },
          {
            time,
          }
        );
        track.time = time;
        return track;
      } else {
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
    }
    return null;
  }

  @Query(() => Lesson, { nullable: true })
  async latestLesson(@Ctx() { req }: MyContext) {
    if (req.session.userId) return null;
    const lesson = await getConnection().query(
      `
        select * from lesson l
        left join track_lesson tl tl."lessonId" = l.id and tl."userId" = $1 and tl."lessonId" = $1
      `,
      [req.session.userId]
    );
    return lesson;
  }

  @Query(() => TrackingLesson, { nullable: true })
  getTrackLesson(
    @Arg("lessonId", () => Int) lessonId: number,
    @Ctx() { req }: MyContext
  ) {
    if (req.session.userId) {
      return TrackingLesson.findOne({
        where: {
          userId: req.session.userId,
          lessonId,
        },
      });
    }
    return null;
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
