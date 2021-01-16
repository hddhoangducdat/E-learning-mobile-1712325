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

@ObjectType()
@Entity()
export class TrackingCourse extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.courseTrack)
  user: User;

  @Field()
  @PrimaryColumn()
  courseId: number;

  @ManyToOne(() => Course, (course) => course.track)
  course: Course;

  @Field()
  lessonId: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
