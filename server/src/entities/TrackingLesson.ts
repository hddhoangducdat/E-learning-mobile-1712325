import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Lesson } from "./Lesson";
import { User } from "./User";

@ObjectType()
@Entity()
export class TrackingLesson extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.lessonTrack)
  user: User;

  @Field()
  @PrimaryColumn()
  lessonId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.track)
  lesson: Lesson;

  @Field()
  time: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
