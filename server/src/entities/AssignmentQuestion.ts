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
import { Assignment } from "./Assignment";

@ObjectType()
@Entity()
export class AssignmentQuestion extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  assignmentId: number;

  @ManyToOne(() => Assignment, (assignment) => assignment.question)
  assignment: Assignment;

  @Field()
  @Column()
  content!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
