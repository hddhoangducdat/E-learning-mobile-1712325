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
import { Lesson } from "./Lesson";

@ObjectType()
@Entity()
export class Resource extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  lessonId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.resource)
  lesson: Lesson;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  url!: string;

  @Field()
  @Column()
  type!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
