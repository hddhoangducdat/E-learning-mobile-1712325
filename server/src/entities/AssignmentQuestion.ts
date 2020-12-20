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

  @ManyToOne(() => Assignment, (assignment) => assignment.question)
  assignment: Assignment;

  @Field()
  @Column()
  content!: string;

  @Field()
  @Column({ default: 0 })
  contentHtml!: string;

  @Field()
  @Column({ default: false })
  isMultipleChoice: boolean;

  @Field()
  @Column()
  answer!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
