import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Section } from "./Section";
import { Report } from "./Report";
import { Instructor } from "./Instructor";
import { Category } from "./Category";
import { StudentCourse } from "./StudentCourse";
import { FeedBack } from "./FeedBack";

enum Status {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
}

@ObjectType()
@Entity()
export class Course extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  subtitle!: string;

  @Field()
  @Column()
  price!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  requirement!: string;

  @Field()
  @Column()
  learnWhat!: string;

  @Field()
  @Column({
    default: 0,
  })
  soldNumber: number;

  @Field()
  @Column({ default: 0 })
  videoNumber: number;

  @Field()
  @Column({ default: 0 })
  rateNumber: number;

  @Field()
  @Column({ default: 0 })
  totalHours: number;

  @Field()
  @Column({ default: 0 })
  formalityPoint: number;

  @Field()
  @Column({ default: 0 })
  contentPoint: number;

  @Field()
  @Column({ default: 0 })
  presentationPoint: number;

  @Field()
  @Column({
    default:
      "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
  })
  imageUrl: string;

  @Field()
  @Column({ default: "https://www.youtube.com/watch?v=yET2SBRuNm0" })
  promoVidUrl: string;

  @Field()
  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Field()
  @Column({ default: false })
  isDeleted!: boolean;

  @Field()
  @Column({ default: false })
  isHidden!: boolean;

  @Field()
  @Column()
  categoryId: number;

  @Field()
  @ManyToOne(() => Category, (category) => category.course)
  category: Category;

  @OneToMany(() => StudentCourse, (student) => student.course)
  students: StudentCourse[];

  @Field()
  @Column()
  instructorId!: number;

  @ManyToOne(() => Instructor, (instructor) => instructor.courseInstruct)
  instructor: Instructor;

  @OneToMany(() => FeedBack, (feedBacks) => feedBacks.course)
  feedBacks: FeedBack[];

  @Field(() => [Section])
  @OneToMany(() => Section, (section) => section.course)
  section: Section[];

  @OneToMany(() => Report, (report) => report.course)
  report: Report[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt = new Date();
}
