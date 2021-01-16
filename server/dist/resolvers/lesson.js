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
exports.LessonResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Lesson_1 = require("../entities/Lesson");
const Section_1 = require("../entities/Section");
const TrackingLesson_1 = require("../entities/TrackingLesson");
let LessonResolver = class LessonResolver {
    name(lesson, { req, translate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.language === "vi") {
                const response = yield translate.translate(lesson.name, req.session.language);
                return response[0];
            }
            return lesson.name;
        });
    }
    captionName(lesson, { req, translate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.language === "vi") {
                const response = yield translate.translate(lesson.captionName, req.session.language);
                return response[0];
            }
            return lesson.captionName;
        });
    }
    content(lesson, { req, translate }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.language === "vi") {
                const response = yield translate.translate(lesson.content, req.session.language);
                return response[0];
            }
            return lesson.content;
        });
    }
    lessons(sectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lessons = yield typeorm_1.getConnection().query(`
        select * from lesson
        where "sectionId" = $1
        order by id 
      `, [sectionId]);
            return lessons;
        });
    }
    section(lesson) {
        return Section_1.Section.findOne(lesson.sectionId);
    }
    trackLesson(lessonId, time, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                let track;
                try {
                    track = yield TrackingLesson_1.TrackingLesson.create({
                        userId: req.session.userId,
                        lessonId,
                        time,
                    }).save();
                    req.session.lesson = lessonId;
                }
                catch (err) {
                    return null;
                }
                return track;
            }
            return null;
        });
    }
    latestLesson({ req }) {
        return Lesson_1.Lesson.findOne(req.session.lessonId, {
            relations: ["track"],
        });
    }
    lesson(lessonId) {
        return Lesson_1.Lesson.findOne(lessonId, {
            relations: ["resource", "track"],
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Lesson_1.Lesson, Object]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "name", null);
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Lesson_1.Lesson, Object]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "captionName", null);
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Lesson_1.Lesson, Object]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "content", null);
__decorate([
    type_graphql_1.Query(() => [Lesson_1.Lesson]),
    __param(0, type_graphql_1.Arg("sectionId", () => Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "lessons", null);
__decorate([
    type_graphql_1.FieldResolver(() => Section_1.Section),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Lesson_1.Lesson]),
    __metadata("design:returntype", void 0)
], LessonResolver.prototype, "section", null);
__decorate([
    type_graphql_1.Mutation(() => TrackingLesson_1.TrackingLesson, { nullable: true }),
    __param(0, type_graphql_1.Arg("lessonId", () => Number)),
    __param(1, type_graphql_1.Arg("time", () => Number)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "trackLesson", null);
__decorate([
    type_graphql_1.Query(() => Lesson_1.Lesson, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "latestLesson", null);
__decorate([
    type_graphql_1.Query(() => Lesson_1.Lesson, { nullable: true }),
    __param(0, type_graphql_1.Arg("lessonId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LessonResolver.prototype, "lesson", null);
LessonResolver = __decorate([
    type_graphql_1.Resolver(Lesson_1.Lesson)
], LessonResolver);
exports.LessonResolver = LessonResolver;
//# sourceMappingURL=lesson.js.map