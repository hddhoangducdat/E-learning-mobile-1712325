import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Course } from "./Course";
import { Lesson } from "./Lesson";
import { Assignment } from "./Assignment";

@ObjectType()
@Entity()
export class Section extends BaseEntity {
  @Field()
  @Column()
  id!: string;

  @Field()
  @ManyToOne(() => Course, (course) => course.section)
  course: Course;

  @Field()
  @OneToMany(() => Lesson, (lesson) => lesson.section)
  lesson: Lesson[];

  @Field()
  @OneToMany(() => Assignment, (assignment) => assignment.section)
  assignment: Assignment[];

  @Field()
  @Column({ default: 0 })
  numberOrder: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ default: false })
  isDeleted: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
