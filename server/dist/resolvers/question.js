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
exports.QuestionResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Question_1 = require("../entities/Question");
const User_1 = require("../entities/User");
let PaginatedQuestion = class PaginatedQuestion {
};
__decorate([
    type_graphql_1.Field(() => [Question_1.Question]),
    __metadata("design:type", Array)
], PaginatedQuestion.prototype, "questions", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedQuestion.prototype, "hasMore", void 0);
PaginatedQuestion = __decorate([
    type_graphql_1.ObjectType()
], PaginatedQuestion);
let QuestionResolver = class QuestionResolver {
    user({ userId }) {
        return User_1.User.findOne(userId);
    }
    postQuestion(lessonId, content, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            let question = yield Question_1.Question.create({
                content,
                lessonId,
                userId: req.session.userId,
            }).save();
            return question;
        });
    }
    postReplyQuestion(lessonId, repliedQuestionId, content, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield Question_1.Question.create({
                content,
                lessonId,
                userId: req.session.userId,
                repliedQuestionId,
            }).save();
            return question;
        });
    }
    questions(limit, cursor, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(10, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne, lessonId];
            if (cursor) {
                replacements.push(cursor);
            }
            const questions = yield typeorm_1.getConnection().query(`
        select * from question q
        where "lessonId" = $2 and "repliedQuestionId" is null ${cursor ? `and q."createdAt" < $3` : ``}
        order by "createdAt" DESC
        limit $1
      `, replacements);
            return {
                questions: questions.slice(0, realLimit),
                hasMore: questions.length === realLimitPlusOne,
            };
        });
    }
    replyQuestions(limit, cursor, questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(10, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne, questionId];
            if (cursor) {
                replacements.push(cursor);
            }
            const questions = yield typeorm_1.getConnection().query(`
        select * from question q
        where "repliedQuestionId" = $2 ${cursor ? `and q."createdAt" < $3` : ``}
        order by "createdAt" DESC
        limit $1
      `, replacements);
            return {
                questions: questions.slice(0, realLimit),
                hasMore: questions.length === realLimitPlusOne,
            };
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Question_1.Question]),
    __metadata("design:returntype", void 0)
], QuestionResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Mutation(() => Question_1.Question),
    __param(0, type_graphql_1.Arg("lessonId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("content", () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "postQuestion", null);
__decorate([
    type_graphql_1.Mutation(() => Question_1.Question),
    __param(0, type_graphql_1.Arg("lessonId", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("repliedQuestionId", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg("content", () => String)),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "postReplyQuestion", null);
__decorate([
    type_graphql_1.Query(() => PaginatedQuestion),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => Date, { nullable: true })),
    __param(2, type_graphql_1.Arg("lessonId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "questions", null);
__decorate([
    type_graphql_1.Query(() => PaginatedQuestion),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => Date, { nullable: true })),
    __param(2, type_graphql_1.Arg("questionId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number]),
    __metadata("design:returntype", Promise)
], QuestionResolver.prototype, "replyQuestions", null);
QuestionResolver = __decorate([
    type_graphql_1.Resolver(Question_1.Question)
], QuestionResolver);
exports.QuestionResolver = QuestionResolver;
//# sourceMappingURL=question.js.map