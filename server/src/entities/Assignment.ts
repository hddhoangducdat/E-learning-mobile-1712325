import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Lesson } from "./Lesson";
import { AssignmentQuestion } from "./AssignmentQuestion";
import { UserAnswer } from "./UserAnswer";

enum Status {
  PENDING = "PENDING",
  SOLVED = "SOLVED",
}

@ObjectType()
@Entity()
export class Assignment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  lessonId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.assignment)
  lesson: Lesson;

  @Field()
  @Column({ default: "TEXT" })
  type: string;

  @Field()
  @Column({ nullable: true })
  code: string;

  @OneToMany(() => AssignmentQuestion, (question) => question.assignment)
  question: AssignmentQuestion[];

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.assignment)
  userResult: UserAnswer;

  @Field()
  @Column()
  anwser: string;

  @Field()
  @Column({ default: 30000 })
  time: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column({ default: true })
  isDeleted: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
