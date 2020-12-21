import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Course } from "./Course";
import { User } from "./User";
import { Lesson } from "./Lesson";

@ObjectType()
@Entity()
export class ForumQuestion extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.question)
  user: User;

  @ManyToOne(() => Course, (course) => course.question)
  course: Course;

  @ManyToOne(() => Lesson, (lesson) => lesson.question)
  lesson: Lesson;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  content!: string;

  @Field()
  @Column({ default: 0 })
  votedNumber: number;

  @Field()
  @Column({
    default: 0,
  })
  repliedNumber: number;

  @Field()
  @Column({
    default: true,
  })
  isResolved: boolean;

  @Field()
  @Column({ default: true })
  isPublished: true;

  @Field(() => [String])
  @Column({ array: true })
  tagIds: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
