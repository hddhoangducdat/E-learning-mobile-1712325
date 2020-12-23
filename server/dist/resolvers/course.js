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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Course_1 = require("../entities/Course");
let PaginatedCourse = class PaginatedCourse {
};
__decorate([
    type_graphql_1.Field(() => [Course_1.Course]),
    __metadata("design:type", Array)
], PaginatedCourse.prototype, "courses", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedCourse.prototype, "hasMore", void 0);
PaginatedCourse = __decorate([
    type_graphql_1.ObjectType()
], PaginatedCourse);
let CourseResolver = class CourseResolver {
    course(id) {
        return Course_1.Course.findOne(id, {
            relations: ["section"],
        });
    }
    courses(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(20, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne];
            if (cursor) {
                replacements.push(cursor);
            }
            const courses = yield typeorm_1.getConnection().query(`
        select * from course
        ${cursor ? `where "createdAt" < $2` : ""}
        order by "createdAt" DESC
        limit $1
      `, replacements);
            return {
                courses: courses.slice(0, realLimit),
                hasMore: courses.length === realLimitPlusOne,
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Course_1.Course, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "course", null);
__decorate([
    type_graphql_1.Query(() => PaginatedCourse),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => Date, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "courses", null);
CourseResolver = __decorate([
    type_graphql_1.Resolver(Course_1.Course)
], CourseResolver);
exports.CourseResolver = CourseResolver;
//# sourceMappingURL=course.js.map