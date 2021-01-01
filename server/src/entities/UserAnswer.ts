import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
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
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.result)
  user: User;

  @Field()
  @Column()
  assignmentId: number;

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
