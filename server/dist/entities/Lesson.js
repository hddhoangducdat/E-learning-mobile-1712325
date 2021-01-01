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
exports.Lesson = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Section_1 = require("./Section");
const Resource_1 = require("./Resource");
const Assignment_1 = require("./Assignment");
const Question_1 = require("./Question");
let Lesson = class Lesson extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Lesson.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => [Resource_1.Resource]),
    typeorm_1.OneToMany(() => Resource_1.Resource, (resource) => resource.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "resource", void 0);
__decorate([
    type_graphql_1.Field(() => [Assignment_1.Assignment]),
    typeorm_1.OneToMany(() => Assignment_1.Assignment, (assignment) => assignment.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "assignment", void 0);
__decorate([
    type_graphql_1.Field(() => [Question_1.Question]),
    typeorm_1.OneToMany(() => Question_1.Question, (forumQ) => forumQ.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "questions", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Lesson.prototype, "sectionId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Section_1.Section, (section) => section.lesson),
    __metadata("design:type", Section_1.Section)
], Lesson.prototype, "section", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Lesson.prototype, "numberOrder", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Lesson.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: "Code" }),
    __metadata("design:type", String)
], Lesson.prototype, "content", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: "https://www.youtube.com/watch?v=Z5iWr6Srsj8&t=64s" }),
    __metadata("design:type", String)
], Lesson.prototype, "video", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: "Code" }),
    __metadata("design:type", String)
], Lesson.prototype, "captionName", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        default: 0,
    }),
    __metadata("design:type", Number)
], Lesson.prototype, "times", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isPreview", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isDeleted", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Lesson.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Lesson.prototype, "updatedAt", void 0);
Lesson = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Lesson);
exports.Lesson = Lesson;
//# sourceMappingURL=Lesson.js.map