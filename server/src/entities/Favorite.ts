import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Course } from "./Course";

import { User } from "./User";

@ObjectType()
@Entity()
export class Favorite extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId!: number;

  @Field()
  @PrimaryColumn()
  courseId!: number;

  @ManyToOne(() => User, (user) => user.favorite)
  user: User;

  @ManyToOne(() => Course, (course) => course.favorite)
  course: Course;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
