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
exports.Assignment = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Lesson_1 = require("./Lesson");
const AssignmentQuestion_1 = require("./AssignmentQuestion");
const UserAnswer_1 = require("./UserAnswer");
let Assignment = class Assignment extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Assignment.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Assignment.prototype, "lessonId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Lesson_1.Lesson, (lesson) => lesson.assignment),
    __metadata("design:type", Lesson_1.Lesson)
], Assignment.prototype, "lesson", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: "TEXT" }),
    __metadata("design:type", String)
], Assignment.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Assignment.prototype, "code", void 0);
__decorate([
    typeorm_1.OneToMany(() => AssignmentQuestion_1.AssignmentQuestion, (question) => question.assignment),
    __metadata("design:type", Array)
], Assignment.prototype, "question", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserAnswer_1.UserAnswer, (userAnswer) => userAnswer.assignment),
    __metadata("design:type", UserAnswer_1.UserAnswer)
], Assignment.prototype, "userResult", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Assignment.prototype, "anwser", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 30000 }),
    __metadata("design:type", Number)
], Assignment.prototype, "time", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Assignment.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Assignment.prototype, "isDeleted", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Assignment.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Assignment.prototype, "updatedAt", void 0);
Assignment = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Assignment);
exports.Assignment = Assignment;
//# sourceMappingURL=Assignment.js.map