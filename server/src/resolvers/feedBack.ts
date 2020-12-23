import { FeedBack } from "../entities/FeedBack";
import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@ObjectType()
class PaginatedFeedBack {
  @Field(() => [FeedBack])
  feedBacks: FeedBack[];
  @Field()
  hasMore: boolean;
}

@Resolver(FeedBack)
export class FeedBackResolver {
  @Query(() => PaginatedFeedBack)
  async feedBacks(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Date, { nullable: true }) cursor: string | null
  ): Promise<PaginatedFeedBack> {
    const realLimit = Math.min(5, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(cursor);
    }

    const feedBacks = await getConnection().query(
      `
        select * from feed_back
        ${cursor ? `where "createdAt" < $2` : ""}
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
