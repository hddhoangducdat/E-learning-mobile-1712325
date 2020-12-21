import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Course } from "./Course";
import { ForumQuestion } from "./ForumQuestion";
import { Feedback } from "./Feedback";
import { Report } from "./Report";
import { UserAnswer } from "./UserAnswer";
import { Instructor } from "./Instructor";

export enum UserType {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  phone!: string;

  @Field()
  @Column({
    default:
      "https://img.favpng.com/12/15/21/computer-icons-avatar-user-profile-recommender-system-png-favpng-HaMDUPFH1etkLCdiFjgTKHzAs.jpg",
  })
  avatar: string;

  @Field()
  @Column({
    type: "enum",
    enum: UserType,
    default: UserType.STUDENT,
  })
  type!: UserType;

  @Field()
  @Column({
    default: false,
  })
  isDelete: boolean;

  @Field()
  @Column({ default: true })
  isActivated: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  instructorId!: string;

  @Field(() => Instructor, { nullable: true })
  @OneToOne(() => Instructor, (instructor) => instructor.user)
  @JoinColumn()
  instructor: Instructor;

  @OneToMany(() => ForumQuestion, (forumQ) => forumQ.user)
  question: ForumQuestion[];

  @OneToMany(() => Feedback, (feedBack) => feedBack.user)
  feedBack: Feedback[];

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];

  @OneToMany(() => UserAnswer, (answser) => answser.user)
  anwser: UserAnswer[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
