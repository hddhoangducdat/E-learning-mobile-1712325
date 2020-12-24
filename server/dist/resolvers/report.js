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
exports.ReportResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Report_1 = require("../entities/Report");
let PaginatedReport = class PaginatedReport {
};
__decorate([
    type_graphql_1.Field(() => [Report_1.Report]),
    __metadata("design:type", Array)
], PaginatedReport.prototype, "reports", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedReport.prototype, "hasMore", void 0);
PaginatedReport = __decorate([
    type_graphql_1.ObjectType()
], PaginatedReport);
let ReportResolver = class ReportResolver {
    user(report) {
        return User_1.User.findOne(report.userId);
    }
    reports(limit, cursor, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(5, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne];
            let query = "";
            if (cursor) {
                replacements.push(cursor);
                query += `"createdAt" < $2`;
            }
            if (courseId) {
                replacements.push(courseId);
            }
            const rePorts = yield typeorm_1.getConnection().query(`
        select * from report
        ${cursor ? `where "createdAt" < $2 and ` : "where "} "courseId" = $${replacements.length}       
        order by "createdAt" DESC
        limit $1
      `, replacements);
            return {
                reports: rePorts.slice(0, realLimit),
                hasMore: rePorts.length === realLimitPlusOne,
            };
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Report_1.Report]),
    __metadata("design:returntype", void 0)
], ReportResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Query(() => PaginatedReport),
    __param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", () => Date, { nullable: true })),
    __param(2, type_graphql_1.Arg("courseId", () => Number, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportResolver.prototype, "reports", null);
ReportResolver = __decorate([
    type_graphql_1.Resolver(Report_1.Report)
], ReportResolver);
exports.ReportResolver = ReportResolver;
//# sourceMappingURL=report.js.map