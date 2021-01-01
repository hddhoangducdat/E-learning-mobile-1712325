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
var Question_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Lesson_1 = require("./Lesson");
let Question = Question_1 = class Question extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Question.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.questions),
    __metadata("design:type", User_1.User)
], Question.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Question.prototype, "lessonId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Lesson_1.Lesson, (lesson) => lesson.questions),
    __metadata("design:type", Lesson_1.Lesson)
], Question.prototype, "lesson", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Question.prototype, "repliedQuestionId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Question_1, (question) => question.repliedQuestion),
    __metadata("design:type", Question)
], Question.prototype, "repliedQuestion", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Question.prototype, "votedNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: 0,
    }),
    __metadata("design:type", Number)
], Question.prototype, "repliedNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: true,
    }),
    __metadata("design:type", Boolean)
], Question.prototype, "isResolved", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Question.prototype, "isPublished", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "tagIds", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Question.prototype, "updatedAt", void 0);
Question = Question_1 = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Question);
exports.Question = Question;
//# sourceMappingURL=Question.js.map