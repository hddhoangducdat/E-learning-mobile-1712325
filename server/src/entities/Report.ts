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
import { User } from "./User";
import { Course } from "./Course";

enum Status {
  PENDING = "PENDING",
  SOLVED = "SOLVED",
}

@ObjectType()
@Entity()
export class Report extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @Field()
  @Column()
  courseId: number;

  @ManyToOne(() => Course, (course) => course.report)
  course: Course;

  @Field()
  @Column()
  subject!: string;

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
