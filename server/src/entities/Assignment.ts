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
import { Course } from "./Course";
import { Section } from "./Section";
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
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Section, (section) => section.assignment)
  section: Section;

  @ManyToOne(() => Course, (course) => course.assignment)
  course: Course;

  @ManyToOne(() => Lesson, (lesson) => lesson.assignment)
  lesson: Lesson;

  @OneToMany(() => AssignmentQuestion, (question) => question.assignment)
  question: AssignmentQuestion[];

  @OneToMany(() => UserAnswer, (anwser) => anwser.assignment)
  anwser: UserAnswer[];

  @Field()
  @Column()
  time!: string;

  @Field()
  @Column({ default: 0 })
  numberQuestion: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column({ default: true })
  isDeleted: boolean;

  @Field()
  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
