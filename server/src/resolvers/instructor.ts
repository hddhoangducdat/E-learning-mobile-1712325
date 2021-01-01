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
export class InstructorResolver {}
