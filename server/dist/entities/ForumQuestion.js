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
exports.ForumQuestion = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Course_1 = require("./Course");
const User_1 = require("./User");
const Lesson_1 = require("./Lesson");
let ForumQuestion = class ForumQuestion extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ForumQuestion.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.question),
    __metadata("design:type", User_1.User)
], ForumQuestion.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Course_1.Course, (course) => course.question),
    __metadata("design:type", Course_1.Course)
], ForumQuestion.prototype, "course", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Lesson_1.Lesson, (lesson) => lesson.question),
    __metadata("design:type", Lesson_1.Lesson)
], ForumQuestion.prototype, "lesson", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ForumQuestion.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ForumQuestion.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], ForumQuestion.prototype, "votedNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: 0,
    }),
    __metadata("design:type", Number)
], ForumQuestion.prototype, "repliedNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: true,
    }),
    __metadata("design:type", Boolean)
], ForumQuestion.prototype, "isResolved", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], ForumQuestion.prototype, "isPublished", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column({ array: true }),
    __metadata("design:type", String)
], ForumQuestion.prototype, "tagIds", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ForumQuestion.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], ForumQuestion.prototype, "updatedAt", void 0);
ForumQuestion = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], ForumQuestion);
exports.ForumQuestion = ForumQuestion;
//# sourceMappingURL=ForumQuestion.js.map