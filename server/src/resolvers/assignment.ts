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
import { Assignment } from "../entities/Assignment";
import { AssignmentQuestion } from "../entities/AssignmentQuestion";

@Resolver(Assignment)
export class AssignmentResolver {
  @FieldResolver(() => [AssignmentQuestion], { nullable: true })
  async question(@Root() { id }: Assignment) {
    const questionAssignment = await AssignmentQuestion.find({
      where: {
        assignmentId: id,
      },
    });
    if (questionAssignment.length === 0) {
      return null;
    }
    return questionAssignment;
  }

  @Query(() => [Assignment])
  async assignments(
    @Arg("lessonId", () => Number) lessonId: number
  ): Promise<Assignment[]> {
    const assignments = await getConnection().query(
      `
        select * from assignment
        where "lessonId" = $1
        order by id 
      `,
      [lessonId]
    );

    return assignments;
  }
}
