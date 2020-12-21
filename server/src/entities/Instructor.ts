import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Course } from "./Course";

@ObjectType()
@Entity()
export class Instructor extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  major!: string;

  @Field()
  @Column()
  intro!: string;

  @Field()
  @Column({ default: "web developement" })
  skills: string;

  @Column({ default: 0 })
  cumulativeTuition: number;

  @OneToOne(() => User, (user) => user.instructor)
  user: User;

  @OneToMany(() => Course, (course) => course.instructor)
  courseInstruct: Course[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
