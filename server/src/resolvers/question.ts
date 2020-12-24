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
import { Question } from "../entities/Question";
import { User } from "../entities/User";

@ObjectType()
class PaginatedQuestion {
  @Field(() => [Question])
  questions: Question[];
  @Field()
  hasMore: boolean;
}

@Resolver(Question)
export class QuestionResolver {
  @FieldResolver(() => User)
  user(@Root() { userId }: Question) {
    return User.findOne(userId);
  }

  @Query(() => PaginatedQuestion)
  async questions(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Date, { nullable: true }) cursor: string | null,
    @Arg("lessonId", () => Int) lessonId: number
  ): Promise<PaginatedQuestion> {
    const realLimit = Math.min(10, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne, lessonId];

    if (cursor) {
      replacements.push(cursor);
    }

    const questions = await getConnection().query(
      `
        select * from question q
        where "lessonId" = $2 and "repliedQuestionId" is null ${
          cursor ? `and q."createdAt" < $3` : ``
        }
        order by "createdAt" DESC
        limit $1
      `,
      replacements
    );

    return {
      questions: questions.slice(0, realLimit),
      hasMore: questions.length === realLimitPlusOne,
    };
  }

  @Query(() => PaginatedQuestion)
  async replyQuestions(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Date, { nullable: true }) cursor: string | null,
    @Arg("questionId", () => Int) questionId: number
  ): Promise<PaginatedQuestion> {
    const realLimit = Math.min(10, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne, questionId];

    if (cursor) {
      replacements.push(cursor);
    }

    const questions = await getConnection().query(
      `
        select * from question q
        where "repliedQuestionId" = $2 ${cursor ? `and q."createdAt" < $3` : ``}
        order by "createdAt" DESC
        limit $1
      `,
      replacements
    );

    return {
      questions: questions.slice(0, realLimit),
      hasMore: questions.length === realLimitPlusOne,
    };
  }
}
