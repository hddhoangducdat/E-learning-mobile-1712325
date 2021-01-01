import { User } from "../entities/User";
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
import { Report } from "../entities/Report";

@ObjectType()
class PaginatedReport {
  @Field(() => [Report])
  reports: Report[];
  @Field()
  hasMore: boolean;
}

@Resolver(Report)
export class ReportResolver {
  @FieldResolver(() => User)
  user(@Root() report: Report) {
    return User.findOne(report.userId);
  }

  @Query(() => PaginatedReport)
  async reports(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Date, { nullable: true }) cursor: string | null,
    @Arg("courseId", () => Number, { nullable: true }) courseId: number | null
  ): Promise<PaginatedReport> {
    const realLimit = Math.min(5, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    let query = "";

    if (cursor) {
      replacements.push(cursor);
      query += `"createdAt" < $2`;
    }

    if (courseId) {
      replacements.push(courseId);
    }

    const rePorts = await getConnection().query(
      `
        select * from report
        ${cursor ? `where "createdAt" < $2 and ` : "where "} "courseId" = $${
        replacements.length
      }       
        order by "createdAt" DESC
        limit $1
      `,
      replacements
    );

    return {
      reports: rePorts.slice(0, realLimit),
      hasMore: rePorts.length === realLimitPlusOne,
    };
  }
}
