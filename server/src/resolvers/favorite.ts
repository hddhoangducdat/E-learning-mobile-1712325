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
import { Category } from "../entities/Category";

@Resolver(Favorite)
export class FavoriteResolver {
  @FieldResolver(() => Category)
  category(@Root() course: Course) {
    return Category.findOne(course.categoryId);
  }

  @Mutation(() => Boolean, { nullable: true })
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
      return true;
    } else return false;
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
      console.log(courses);
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
