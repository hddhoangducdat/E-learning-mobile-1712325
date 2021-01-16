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
import { Favorite } from "../entities/Favorite";

@Resolver(Favorite)
export class FavoriteResolver {
  @Mutation(() => Course, { nullable: true })
  async addToMyFavorite(
    @Arg("courseId", () => Number) courseId: number,
    @Ctx() { req }: MyContext
  ) {
    if (req.session.userId) {
      await getConnection().query(
        `
          insert into favorite ("userId", "courseId")
          values ($1, $2)
        `,
        [req.session.userId, courseId]
      );
      const course = await Course.find({
        where: {
          id: courseId,
        },
      });
      return course[0];
    } else return null;
  }

  @Query(() => [Course], { nullable: true })
  async myFavorite(@Ctx() { req }: MyContext) {
    if (req.session.userId) {
      const courses = await getConnection().query(
        `
          select * from course c
          inner join favorite f on f."courseId" = c.id and f."userId" = $1
        `,
        [req.session.userId]
      );
      return courses;
    }
    return null;
  }

  @Mutation(() => Boolean)
  async removeFromFavorite(
    @Arg("courseId", () => Number) courseId: number,
    @Ctx() { req }: MyContext
  ) {
    if (req.session.userId)
      await Favorite.delete({ courseId, userId: req.session.userId });
    return true;
  }
}
