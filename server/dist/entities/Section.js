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
exports.Section = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Course_1 = require("./Course");
const Lesson_1 = require("./Lesson");
let Section = class Section extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Section.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Section.prototype, "courseId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Course_1.Course, (course) => course.section),
    __metadata("design:type", Course_1.Course)
], Section.prototype, "course", void 0);
__decorate([
    typeorm_1.OneToMany(() => Lesson_1.Lesson, (lesson) => lesson.section),
    __metadata("design:type", Array)
], Section.prototype, "lesson", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Section.prototype, "numberOrder", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Section.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Section.prototype, "isDeleted", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Section.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Section.prototype, "updatedAt", void 0);
Section = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Section);
exports.Section = Section;
//# sourceMappingURL=Section.js.map