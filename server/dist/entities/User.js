"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserType = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Instructor_1 = require("./Instructor");
const StudentCourse_1 = require("./StudentCourse");
const UserAnswer_1 = require("./UserAnswer");
const Question_1 = require("./Question");
const Report_1 = require("./Report");
const FeedBack_1 = require("./FeedBack");
const Favorite_1 = require("./Favorite");
const TrackingLesson_1 = require("./TrackingLesson");
const TrackingCourse_1 = require("./TrackingCourse");
var UserType;
(function (UserType) {
    UserType["STUDENT"] = "STUDENT";
    UserType["INSTRUCTOR"] = "INSTRUCTOR";
})(UserType = exports.UserType || (exports.UserType = {}));
let User = class User extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: "https://img.favpng.com/12/15/21/computer-icons-avatar-user-profile-recommender-system-png-favpng-HaMDUPFH1etkLCdiFjgTKHzAs.jpg",
    }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "enum",
        enum: UserType,
        default: UserType.STUDENT,
    }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isDelete", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActivated", void 0);
__decorate([
    type_graphql_1.Field(() => Number),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "instructorId", void 0);
__decorate([
    type_graphql_1.Field(() => Instructor_1.Instructor, { nullable: true }),
    typeorm_1.OneToOne(() => Instructor_1.Instructor, (instructor) => instructor.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Instructor_1.Instructor)
], User.prototype, "instructor", void 0);
__decorate([
    typeorm_1.OneToMany(() => StudentCourse_1.StudentCourse, (studentCourse) => studentCourse.user),
    __metadata("design:type", Array)
], User.prototype, "myCourse", void 0);
__decorate([
    typeorm_1.OneToMany(() => FeedBack_1.FeedBack, (feedBacks) => feedBacks.user),
    __metadata("design:type", Array)
], User.prototype, "feedBacks", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserAnswer_1.UserAnswer, (userAnswer) => userAnswer.user),
    __metadata("design:type", Array)
], User.prototype, "result", void 0);
__decorate([
    typeorm_1.OneToMany(() => TrackingLesson_1.TrackingLesson, (track) => track.user),
    __metadata("design:type", Array)
], User.prototype, "lessonTrack", void 0);
__decorate([
    typeorm_1.OneToMany(() => TrackingCourse_1.TrackingCourse, (track) => track.user),
    __metadata("design:type", Array)
], User.prototype, "courseTrack", void 0);
__decorate([
    typeorm_1.OneToMany(() => Question_1.Question, (question) => question.user),
    __metadata("design:type", Array)
], User.prototype, "questions", void 0);
__decorate([
    typeorm_1.OneToMany(() => Report_1.Report, (report) => report.user),
    __metadata("design:type", Array)
], User.prototype, "reports", void 0);
__decorate([
    typeorm_1.OneToMany(() => Favorite_1.Favorite, (favorite) => favorite.user),
    __metadata("design:type", Array)
], User.prototype, "favorite", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map