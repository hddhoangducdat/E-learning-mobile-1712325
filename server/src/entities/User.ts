import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Course } from "./Course";
import { ForumQuestion } from "./ForumQuestion";
import { Feedback } from "./Feedback";
import { Report } from "./Report";
import { UserAnswer } from "./UserAnswer";

enum UserType {
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
  @Column({ unique: true })
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

  @Field()
  @OneToMany(() => Course, (course) => course.instructor)
  courseInstructor: Course[];

  @Field()
  @OneToMany(() => ForumQuestion, (forumQ) => forumQ.user)
  question: ForumQuestion[];

  @Field()
  @OneToMany(() => Feedback, (feedBack) => feedBack.user)
  feedBack: Feedback[];

  @Field()
  @OneToMany(() => Report, (report) => report.user)
  report: Report[];

  @Field()
  @OneToMany(() => UserAnswer, (answser) => answser.user)
  anwser: UserAnswer[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
