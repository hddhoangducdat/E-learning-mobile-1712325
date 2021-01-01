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
import { Instructor } from "./Instructor";
import { StudentCourse } from "./StudentCourse";
import { UserAnswer } from "./UserAnswer";
import { Question } from "./Question";
import { Report } from "./Report";
import { FeedBack } from "./FeedBack";

export enum UserType {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Field(() => Number)
  @Column({ nullable: true })
  instructorId!: number;

  @Field(() => Instructor, { nullable: true })
  @OneToOne(() => Instructor, (instructor) => instructor.user)
  @JoinColumn()
  instructor: Instructor;

  @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.user)
  myCourse: StudentCourse[];

  @OneToMany(() => FeedBack, (feedBacks) => feedBacks.user)
  feedBacks: FeedBack[];

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.user)
  result: UserAnswer[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
