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
import { Assignment } from "./Assignment";

@ObjectType()
@Entity()
export class UserAnswer extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.anwser)
  user: User;

  @Field()
  @ManyToOne(() => Assignment, (assignment) => assignment.anwser)
  assignment: Assignment;

  @Field()
  @Column({ default: 0 })
  score: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
