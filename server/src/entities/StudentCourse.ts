import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Course } from "./Course";

import { User } from "./User";

export enum UserType {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}

@ObjectType()
@Entity()
export class StudentCourse extends BaseEntity {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  courseId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.myCourse)
  user: User;

  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.students)
  course: Course;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
