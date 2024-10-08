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
const TrackingCourse_1 = require("../entities/TrackingCourse");
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
    type_graphql_1.ObjectType({ isAbstract: true })
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
    getHistory({ req }) {
        if (req.session.history) {
            return req.session.history;
        }
        return [];
    }
    saveHistory(search, { req }) {
        try {
            if (!req.session.history)
                req.session.history = [];
            if (req.session.history && !req.session.history.includes(search)) {
                if (req.session.history.length === 5)
                    req.session.history.shift();
                req.session.history.push(search);
            }
            else {
                req.session.history = [search];
            }
        }
        catch (err) { }
        return true;
    }
    removeHistory(search, { req }) {
        if (!req.session.history)
            req.session.history = [];
        req.session.history = req.session.history.filter((text) => text !== search);
        return true;
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
    getTrackCourse(courseId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                const track = yield TrackingCourse_1.TrackingCourse.findOne({
                    where: {
                        userId: req.session.userId,
                        courseId,
                    },
                });
                console.log(track);
                return track;
            }
            return null;
        });
    }
    removeTrackCourse(courseId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                yield TrackingCourse_1.TrackingCourse.delete({
                    userId: req.session.userId,
                    courseId,
                });
                return true;
            }
            return false;
        });
    }
    recommend({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let str = "";
            if (req.session.history) {
                req.session.history.forEach((h, i) => {
                    if (i === 0)
                        str += `c.title LIKE '%${h}%'`;
                    else
                        str += `or c.title LIKE '%${h}%'`;
                });
            }
            const courses = yield typeorm_1.getConnection().query(`
        select c.id, c.title, c.subtitle, c.price, c.description,
        c.requirement, c."learnWhat", c."soldNumber", c."videoNumber", c."rateNumber",
        c."totalHours", c."promoVidUrl", c."formalityPoint", c."contentPoint", 
        c."presentationPoint", c."instructorId", c."imageUrl", c."createdAt", c."categoryId"
        ${req.session.userId ? `, f."userId"` : ""}        
        from course c
        ${req.session.userId
                ? `left join favorite f on f."courseId" = c.id and f."userId"=` +
                    req.session.userId
                : ""}
        where 
        ${req.session.history ? str : `c."rateNumber" > 4`}
        order by c."soldNumber" DESC
        limit 10
      `);
            return courses.map((course, index) => {
                return Object.assign(Object.assign({}, course), { favorite: {
                        userId: course.userId ? course.userId : -1,
                    } });
            });
        });
    }
    coursesPresent(limit, categoryId, isAsc, orderType, search, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(20, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne];
            let where = [];
            if (search) {
                const listSearch = search.toLowerCase().split(" ");
                let query = `c.title LIKE '${"%" + search + "%"}'`;
                if (listSearch.length !== 1) {
                    listSearch.map((value) => {
                        if (value.length > 2) {
                            query += ` OR c.title LIKE '${"%" + value + "%"}'`;
                        }
                    });
                }
                where.push(query);
            }
            if (categoryId) {
                replacements.push(categoryId);
                where.push(`c."categoryId" = $${replacements.length}`);
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
        select c.id, c.title, c.subtitle, c.price, c.description,
        c.requirement, c."learnWhat", c."soldNumber", c."videoNumber", c."rateNumber",
        c."totalHours", c."promoVidUrl", c."formalityPoint", c."contentPoint", 
        c."presentationPoint", c."instructorId", c."imageUrl", c."createdAt", c."categoryId"
        ${req.session.userId ? `, f."userId"` : ""}      
        from course c
        ${req.session.userId
                ? `left join favorite f on f."courseId" = c.id and f."userId"=` +
                    req.session.userId
                : ""}
        ${query.length === 0 ? "" : "where " + query}
        order by c."${order}" ${isAsc ? "ASC" : "DESC"}
        limit $1
      `, replacements);
            return {
                courses: courses
                    .map((course) => {
                    return Object.assign(Object.assign({}, course), { favorite: {
                            userId: course.userId ? course.userId : -1,
                        } });
                })
                    .slice(0, realLimit),
                hasMore: courses.length === realLimitPlusOne,
            };
        });
    }
    courses(limit, cursor, categoryId, isAsc, orderType, search, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(20, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne];
            let where = [];
            if (cursor) {
                replacements.push(cursor);
                where.push(`c."createdAt" < $${replacements.length}`);
            }
            if (search) {
                const listSearch = search.toLowerCase().split(" ");
                let query = `c.title LIKE '${"%" + search + "%"}'`;
                if (listSearch.length !== 1) {
                    listSearch.map((value) => {
                        if (value.length > 2) {
                            query += ` OR c.title LIKE '${"%" + value + "%"}'`;
                        }
                    });
                }
                where.push(query);
            }
            if (categoryId) {
                replacements.push(categoryId);
                where.push(`c."categoryId" = $${replacements.length}`);
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
        select c.id, c.title, c.subtitle, c.price, c.description,
        c.requirement, c."learnWhat", c."soldNumber", c."videoNumber", c."rateNumber",
        c."totalHours", c."promoVidUrl", c."formalityPoint", c."contentPoint", 
        c."presentationPoint", c."instructorId", c."imageUrl", c."createdAt", c."categoryId"
        ${req.session.userId ? `, f."userId"` : ""}    
        from course c
        ${req.session.userId
                ? `left join favorite f on f."courseId" = c.id and f."userId"=` +
                    req.session.userId
                : ""}
        ${query.length === 0 ? "" : "where " + query}
        order by c."${order}" ${isAsc ? "ASC" : "DESC"}
        limit $1
      `, replacements);
            return {
                courses: courses
                    .map((course) => {
                    return Object.assign(Object.assign({}, course), { favorite: {
                            userId: course.userId ? course.userId : -1,
                        } });
                })
                    .slice(0, realLimit),
                hasMore: courses.length === realLimitPlusOne,
            };
        });
    }
    trackCourse(courseId, lessonId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                let track = yield TrackingCourse_1.TrackingCourse.findOne({
                    where: {
                        userId: req.session.userId,
                        courseId: courseId,
                    },
                });
                if (track) {
                    yield TrackingCourse_1.TrackingCourse.update({ courseId, userId: req.session.userId }, {
                        lessonId,
                    });
                    track.lessonId = lessonId;
                    return track;
                }
                else {
                    try {
                        track = yield TrackingCourse_1.TrackingCourse.create({
                            userId: req.session.userId,
                            courseId,
                            lessonId,
                        }).save();
                    }
                    catch (err) {
                        return null;
                    }
                    return track;
                }
            }
            return null;
        });
    }
    purchase(courseId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                yield typeorm_1.getConnection().query(`
          insert into student_course ("userId", "courseId")
          values ($1, $2)
        `, [req.session.userId, courseId]);
                const course = yield Course_1.Course.find({
                    where: {
                        id: courseId,
                    },
                });
                console.log(course);
                return course[0];
            }
            else
                return null;
        });
    }
    myCourse({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                const courses = yield typeorm_1.getConnection().query(`
          select * from course c
          inner join student_course sc on sc."courseId" = c.id
          where sc."userId" = $1
        `, [req.session.userId]);
                return courses;
            }
            return null;
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
    type_graphql_1.Query(() => [String]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "getHistory", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("search", () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "saveHistory", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("search", () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CourseResolver.prototype, "removeHistory", null);
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
    type_graphql_1.Query(() => TrackingCourse_1.TrackingCourse, { nullable: true }),
    __param(0, type_graphql_1.Arg("courseId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "getTrackCourse", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("courseId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "removeTrackCourse", null);
__decorate([
    type_graphql_1.Query(() => [Course_1.Course]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "recommend", null);
__decorate([
    type_graphql_1.Query(() => PaginatedCourse),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("categoryId", () => Number, { nullable: true })),
    __param(2, type_graphql_1.Arg("isAsc", () => Boolean, { nullable: true })),
    __param(3, type_graphql_1.Arg("orderType", () => String, { nullable: true })),
    __param(4, type_graphql_1.Arg("search", () => String, { nullable: true })),
    __param(5, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "coursesPresent", null);
__decorate([
    type_graphql_1.Query(() => PaginatedCourse),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => Date, { nullable: true })),
    __param(2, type_graphql_1.Arg("categoryId", () => Number, { nullable: true })),
    __param(3, type_graphql_1.Arg("isAsc", () => Boolean, { nullable: true })),
    __param(4, type_graphql_1.Arg("orderType", () => String, { nullable: true })),
    __param(5, type_graphql_1.Arg("search", () => String, { nullable: true })),
    __param(6, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "courses", null);
__decorate([
    type_graphql_1.Mutation(() => TrackingCourse_1.TrackingCourse, { nullable: true }),
    __param(0, type_graphql_1.Arg("courseId", () => Number)),
    __param(1, type_graphql_1.Arg("lessonId", () => Number)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "trackCourse", null);
__decorate([
    type_graphql_1.Mutation(() => Course_1.Course, { nullable: true }),
    __param(0, type_graphql_1.Arg("courseId", () => Number)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "purchase", null);
__decorate([
    type_graphql_1.Query(() => [Course_1.Course], { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "myCourse", null);
CourseResolver = __decorate([
    type_graphql_1.Resolver(Course_1.Course)
], CourseResolver);
exports.CourseResolver = CourseResolver;
//# sourceMappingURL=course.js.map