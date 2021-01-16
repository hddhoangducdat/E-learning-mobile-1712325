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
import { User } from "../entities/User";

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
