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
import { User } from "./User";
import { Lesson } from "./Lesson";

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.questions)
  user: User;

  @Field()
  @Column()
  lessonId!: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.questions)
  lesson: Lesson;

  @Field()
  @Column({ nullable: true })
  repliedQuestionId: number;

  @ManyToOne(() => Question, (question) => question.repliedQuestion)
  repliedQuestion: Question;

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

  @Field()
  @Column({ nullable: true })
  tagIds: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
