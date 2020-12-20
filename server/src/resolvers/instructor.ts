import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import { Instructor } from "../entities/Instructor";
import { FieldError } from "./FieldError";

@ObjectType()
class InstructorResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Instructor, { nullable: true })
  instructor?: Instructor;
}

@Resolver(Instructor)
export class InstructorResolver {
  @Query(() => Instructor, { nullable: true })
  instructor(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    return Instructor.findOne(req.session.userId);
  }

  @Mutation(() => InstructorResponse)
  async becomeOrUpdateInstructor(
    @Arg("major") major: string,
    @Arg("intro") intro: string,
    @Ctx() { req }: MyContext
  ) {
    if (major === "") {
      return {
        errors: [
          {
            field: "major",
            message: "major can't be empty",
          },
        ],
      };
    }
    if (intro === "") {
      return {
        errors: [
          {
            field: "intro",
            message: "intro can't be empty",
          },
        ],
      };
    }
    let instructor;
    try {
      instructor = await Instructor.findOne(req.session.userId);
      if (!instructor) {
        instructor = await Instructor.create({
          id: req.session.userId,
          major,
          intro,
        }).save();
      } else {
        instructor.major = major;
        instructor.intro = intro;
        await Instructor.save(instructor);
      }
    } catch (err) {
      console.log(err);
    }

    return { instructor };
  }
}
