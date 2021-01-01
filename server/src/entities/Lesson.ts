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
import { Section } from "./Section";
import { Resource } from "./Resource";
import { Assignment } from "./Assignment";
import { Question } from "./Question";

@ObjectType()
@Entity()
export class Lesson extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [Resource])
  @OneToMany(() => Resource, (resource) => resource.lesson)
  resource: Resource[];

  @Field(() => [Assignment])
  @OneToMany(() => Assignment, (assignment) => assignment.lesson)
  assignment: Assignment[];

  @Field(() => [Question])
  @OneToMany(() => Question, (forumQ) => forumQ.lesson)
  questions: Question[];

  @Field()
  @Column()
  sectionId: number;

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
  content!: string;

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
  times: number;

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
