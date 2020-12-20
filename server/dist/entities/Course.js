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
exports.Course = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const ForumQuestion_1 = require("./ForumQuestion");
const Section_1 = require("./Section");
const Lesson_1 = require("./Lesson");
const Report_1 = require("./Report");
const Assignment_1 = require("./Assignment");
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["COMPLETE"] = "COMPLETE";
})(Status || (Status = {}));
let Course = class Course extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "subtitle", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column({ array: true }),
    __metadata("design:type", String)
], Course.prototype, "requirement", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column({ array: true }),
    __metadata("design:type", String)
], Course.prototype, "learnWhat", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: 0,
    }),
    __metadata("design:type", Number)
], Course.prototype, "soldNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "videoNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "rateNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "totalHours", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "formalityPoint", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "contentPoint", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Course.prototype, "presentationPoint", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: "https://specials-images.forbesimg.com/imageserve/5f302109ffad89f9130e07db/960x0.jpg?cropX1=0&cropX2=4800&cropY1=243&cropY2=2943",
    }),
    __metadata("design:type", String)
], Course.prototype, "imageUrl", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: "https://www.youtube.com/watch?v=yET2SBRuNm0" }),
    __metadata("design:type", String)
], Course.prototype, "promoVidUrl", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING,
    }),
    __metadata("design:type", String)
], Course.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isDeleted", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "isHidden", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.courseInstructor),
    __metadata("design:type", User_1.User)
], Course.prototype, "instructor", void 0);
__decorate([
    typeorm_1.OneToMany(() => ForumQuestion_1.ForumQuestion, (forumQ) => forumQ.course),
    __metadata("design:type", Array)
], Course.prototype, "question", void 0);
__decorate([
    typeorm_1.OneToMany(() => Section_1.Section, (section) => section.course),
    __metadata("design:type", Array)
], Course.prototype, "section", void 0);
__decorate([
    typeorm_1.OneToMany(() => Lesson_1.Lesson, (lesson) => lesson.course),
    __metadata("design:type", Array)
], Course.prototype, "lesson", void 0);
__decorate([
    typeorm_1.OneToMany(() => Report_1.Report, (report) => report.course),
    __metadata("design:type", Array)
], Course.prototype, "report", void 0);
__decorate([
    typeorm_1.OneToMany(() => Assignment_1.Assignment, (assignment) => assignment.course),
    __metadata("design:type", Array)
], Course.prototype, "assignment", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Course.prototype, "updatedAt", void 0);
Course = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Course);
exports.Course = Course;
//# sourceMappingURL=Course.js.map