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
const StudentCourse_1 = require("../entities/StudentCourse");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Course_1 = require("../entities/Course");
const Category_1 = require("../entities/Category");
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
    title(course, { req, translate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.language === "vi") {
                const response = yield translate.translate(course.title, req.session.language);
                return response[0];
            }
            return course.title;
        });
    }
    subtitle(course, { req, translate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.language === "vi") {
                const response = yield translate.translate(course.subtitle, req.session.language);
                return response[0];
            }
            return course.subtitle;
        });
    }
    description(course, { req, translate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.language === "vi") {
                const response = yield translate.translate(course.description, req.session.language);
                return response[0];
            }
            return course.description;
        });
    }
    requirement(course, { req, translate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.language === "vi") {
                const response = yield translate.translate(course.requirement, req.session.language);
                return response[0];
            }
            return course.requirement;
        });
    }
    learnWhat(course, { req, translate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.language === "vi") {
                const response = yield translate.translate(course.learnWhat, req.session.language);
                return response[0];
            }
            return course.learnWhat;
        });
    }
    isOwn(courseId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentCourse = yield StudentCourse_1.StudentCourse.findOne({
                where: {
                    userId: req.session.userId,
                    courseId,
                },
            });
            if (studentCourse) {
                return true;
            }
            return false;
        });
    }
    category(course) {
        return Category_1.Category.findOne(course.categoryId);
    }
    course(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let course = yield Course_1.Course.findOne(id, { relations: ["section"] });
            return course;
        });
    }
    courses(limit, cursor, categoryId, isAsc, orderType, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(20, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne];
            let where = [];
            if (cursor) {
                replacements.push(cursor);
                where.push(`"createdAt" < $${replacements.length}`);
            }
            if (search) {
                const listSearch = search.toLowerCase().split(" ");
                let query = `title LIKE ('${"%" + search + "%"}'`;
                if (listSearch.length !== 1) {
                    listSearch.map((value) => {
                        if (value.length > 2) {
                            query += ` OR title LIKE '${"%" + value + "%"}'`;
                        }
                    });
                }
                where.push(query + ")");
            }
            if (categoryId) {
                replacements.push(categoryId);
                where.push(`"categoryId" = $${replacements.length}`);
            }
            let order;
            switch (orderType) {
                case "BEST_SELLER":
                    order = "soldNumber";
                    break;
                case "RATE":
                    order = "rateNumber";
                    break;
                default:
                    order = "createdAt";
            }
            let query = "";
            where.map((value, index) => {
                query += index === 0 ? value : " AND " + value;
            });
            const courses = yield typeorm_1.getConnection().query(`
        select * from course
        ${query.length === 0 ? "" : "where " + query}
        order by "${order}" ${isAsc ? "ASC" : "DESC"}
        limit $1
      `, replacements);
            return {
                courses: courses.slice(0, realLimit),
                hasMore: courses.length === realLimitPlusOne,
            };
        });
    }
    purchase(courseId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                yield typeorm_1.getConnection().query(`
          insert into student_course ("userId", "courseId")
          values ($1, $2)
        `, [req.session.userId, courseId]);
                return true;
            }
            return false;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "title", null);
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "subtitle", null);
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "description", null);
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "requirement", null);
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "learnWhat", null);
__decorate([
    type_graphql_1.Query(() => Boolean),
    __param(0, type_graphql_1.Arg("courseId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "isOwn", null);
__decorate([
    type_graphql_1.FieldResolver(() => Category_1.Category),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "category", null);
__decorate([
    type_graphql_1.Query(() => Course_1.Course, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "course", null);
__decorate([
    type_graphql_1.Query(() => PaginatedCourse),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => Date, { nullable: true })),
    __param(2, type_graphql_1.Arg("categoryId", () => Number, { nullable: true })),
    __param(3, type_graphql_1.Arg("isAsc", () => Boolean, { nullable: true })),
    __param(4, type_graphql_1.Arg("orderType", () => String, { nullable: true })),
    __param(5, type_graphql_1.Arg("search", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "courses", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("courseId", () => Number)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "purchase", null);
CourseResolver = __decorate([
    type_graphql_1.Resolver(Course_1.Course)
], CourseResolver);
exports.CourseResolver = CourseResolver;
//# sourceMappingURL=course.js.map