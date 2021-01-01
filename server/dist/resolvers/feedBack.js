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
exports.FeedBackResolver = void 0;
const FeedBack_1 = require("../entities/FeedBack");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
let PaginatedFeedBack = class PaginatedFeedBack {
};
__decorate([
    type_graphql_1.Field(() => [FeedBack_1.FeedBack]),
    __metadata("design:type", Array)
], PaginatedFeedBack.prototype, "feedBacks", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedFeedBack.prototype, "hasMore", void 0);
PaginatedFeedBack = __decorate([
    type_graphql_1.ObjectType()
], PaginatedFeedBack);
let FeedBackResolver = class FeedBackResolver {
    user(feedBack) {
        return User_1.User.findOne(feedBack.userId);
    }
    feedBacks(limit, cursor, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(5, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne];
            if (cursor) {
                replacements.push(cursor);
            }
            if (courseId) {
                replacements.push(courseId);
            }
            const feedBacks = yield typeorm_1.getConnection().query(`
        select * from feed_back
        ${cursor ? `where "createdAt" < $2 and ` : `where `} "courseId" = $${replacements.length}
        order by "createdAt" DESC
        limit $1
      `, replacements);
            return {
                feedBacks: feedBacks.slice(0, realLimit),
                hasMore: feedBacks.length === realLimitPlusOne,
            };
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FeedBack_1.FeedBack]),
    __metadata("design:returntype", void 0)
], FeedBackResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Query(() => PaginatedFeedBack),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => Date, { nullable: true })),
    __param(2, type_graphql_1.Arg("courseId", () => Number, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], FeedBackResolver.prototype, "feedBacks", null);
FeedBackResolver = __decorate([
    type_graphql_1.Resolver(FeedBack_1.FeedBack)
], FeedBackResolver);
exports.FeedBackResolver = FeedBackResolver;
//# sourceMappingURL=feedBack.js.map