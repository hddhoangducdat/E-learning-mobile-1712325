import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Instructor extends User {
  @Field()
  @Column()
  major!: string;

  @Field()
  @Column()
  intro!: string;

  @Field()
  @Column({ default: [] })
  skills: string[];

  @Field()
  @Column({ default: 0 })
  cumulativeTuition: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
