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
import { User } from "../entities/User";
import { MyContext } from "../types";

@ObjectType({ isAbstract: true })
class PaginatedFeedBack {
  @Field(() => [FeedBack])
  feedBacks: FeedBack[];
  @Field()
  hasMore: boolean;
}

@Resolver(FeedBack)
export class FeedBackResolver {
  @FieldResolver(() => User)
  user(@Root() feedBack: FeedBack) {
    return User.findOne(feedBack.userId);
  }

  @Mutation(() => Boolean)
  async writeFeedBack(
    @Arg("content", () => String) content: string,
    @Arg("rate", () => Int) rate: number,
    @Arg("courseId", () => Int) courseId: number,
    @Ctx() { req }: MyContext
  ) {
    if (req.session.userId) {
      try {
        await getConnection().query(
          `
          insert into feed_back ("courseId", rate, "userId", content)
          values ($1, $2, $3, $4)
        `,
          [courseId, rate, req.session.userId, content]
        );
      } catch (err) {
        return false;
      }
      return true;
    }
    return false;
  }

  @Query(() => PaginatedFeedBack)
  async feedBacks(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Date, { nullable: true }) cursor: string | null,
    @Arg("courseId", () => Number, { nullable: true }) courseId: number | null
  ): Promise<PaginatedFeedBack> {
    const realLimit = Math.min(5, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(cursor);
    }

    if (courseId) {
      replacements.push(courseId);
    }

    const feedBacks = await getConnection().query(
      `
        select * from feed_back
        ${cursor ? `where "createdAt" < $2 and ` : `where `} "courseId" = $${
        replacements.length
      }
        order by "createdAt" DESC
        limit $1
      `,
      replacements
    );

    return {
      feedBacks: feedBacks.slice(0, realLimit),
      hasMore: feedBacks.length === realLimitPlusOne,
    };
  }
}
