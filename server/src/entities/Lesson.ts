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
import { ForumQuestion } from "./ForumQuestion";
import { Course } from "./Course";
import { Section } from "./Section";
import { Resource } from "./Resource";
import { Assignment } from "./Assignment";

@ObjectType()
@Entity()
export class Lesson extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToMany(() => Resource, (resource) => resource.lesson)
  resource: Resource[];

  @OneToMany(() => Assignment, (assignment) => assignment.lesson)
  assignment: Assignment[];

  @OneToMany(() => ForumQuestion, (forumQ) => forumQ.lesson)
  question: ForumQuestion[];

  @ManyToOne(() => Course, (course) => course.lesson)
  course: Course;

  @ManyToOne(() => Section, (section) => section.lesson)
  section: Section;

  @Field()
  @Column({ default: 0 })
  numberOrder: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ default: "Code" })
  content: string;

  @Field()
  @Column({ default: "https://www.youtube.com/watch?v=Z5iWr6Srsj8&t=64s" })
  video: string;

  @Field()
  @Column({ default: "Code" })
  captionName: string;

  @Field()
  @Column({
    default: 0,
  })
  hours: number;

  @Field()
  @Column({ default: true })
  isPreview: boolean;

  @Field()
  @Column({ default: false })
  isDeleted!: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
