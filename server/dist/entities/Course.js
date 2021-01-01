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
const Section_1 = require("./Section");
const Report_1 = require("./Report");
const Instructor_1 = require("./Instructor");
const Category_1 = require("./Category");
const StudentCourse_1 = require("./StudentCourse");
const FeedBack_1 = require("./FeedBack");
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
    __metadata("design:type", String)
], Course.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Course.prototype, "requirement", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
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
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Course.prototype, "categoryId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.ManyToOne(() => Category_1.Category, (category) => category.course),
    __metadata("design:type", Category_1.Category)
], Course.prototype, "category", void 0);
__decorate([
    typeorm_1.OneToMany(() => StudentCourse_1.StudentCourse, (student) => student.course),
    __metadata("design:type", Array)
], Course.prototype, "students", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Course.prototype, "instructorId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Instructor_1.Instructor, (instructor) => instructor.courseInstruct),
    __metadata("design:type", Instructor_1.Instructor)
], Course.prototype, "instructor", void 0);
__decorate([
    typeorm_1.OneToMany(() => FeedBack_1.FeedBack, (feedBacks) => feedBacks.course),
    __metadata("design:type", Array)
], Course.prototype, "feedBacks", void 0);
__decorate([
    type_graphql_1.Field(() => [Section_1.Section]),
    typeorm_1.OneToMany(() => Section_1.Section, (section) => section.course),
    __metadata("design:type", Array)
], Course.prototype, "section", void 0);
__decorate([
    typeorm_1.OneToMany(() => Report_1.Report, (report) => report.course),
    __metadata("design:type", Array)
], Course.prototype, "report", void 0);
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