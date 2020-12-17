import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Course } from "./Course";
import { User } from "./User";

enum UserType {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
}

@ObjectType()
@Entity()
export class ForumQuestion extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.question)
  user: User;

  @Field()
  @ManyToOne(() => Course, (course) => course.question)
  course: Course;

  @Field()
  @ManyToOne(() => Course, (course) => course.question)
  lesson: Course;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  content!: string;

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

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
