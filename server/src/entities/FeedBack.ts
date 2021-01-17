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
import { Course } from "./Course";
import { User } from "./User";

@ObjectType()
@Entity()
export class FeedBack extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  rate!: number;

  @Field()
  @Column({ default: "subject" })
  subject: string;

  @Field()
  @Column()
  content!: string;

  @Field()
  @Column()
  userId!: number;

  @Field()
  @Column()
  courseId!: number;

  @ManyToOne(() => User, (user) => user.feedBacks)
  user: User;

  @ManyToOne(() => Course, (course) => course.feedBacks)
  course: Course;

  @Field()
  @Column({ default: false })
  isDeleted: boolean;

  @Field()
  @Column({ default: true })
  isResolved: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
