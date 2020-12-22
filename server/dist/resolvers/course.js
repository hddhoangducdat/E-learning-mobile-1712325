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
exports.CourseResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Course_1 = require("../entities/Course");
let CourseResolver = class CourseResolver {
    course() { }
    courses() { }
};
__decorate([
    type_graphql_1.Query(() => Course_1.Course, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "course", null);
__decorate([
    type_graphql_1.Query(() => [Course_1.Course]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "courses", null);
CourseResolver = __decorate([
    type_graphql_1.Resolver(Course_1.Course)
], CourseResolver);
exports.CourseResolver = CourseResolver;
//# sourceMappingURL=course.js.map