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
  @ManyToOne(() => User, (user) => user.report)
  user: User;

  @Field()
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
