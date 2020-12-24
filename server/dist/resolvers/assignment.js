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
exports.AssignmentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Assignment_1 = require("../entities/Assignment");
const AssignmentQuestion_1 = require("../entities/AssignmentQuestion");
let AssignmentResolver = class AssignmentResolver {
    question({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const questionAssignment = yield AssignmentQuestion_1.AssignmentQuestion.find({
                where: {
                    assignmentId: id,
                },
            });
            if (questionAssignment.length === 0) {
                return null;
            }
            return questionAssignment;
        });
    }
    assignments(lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const assignments = yield typeorm_1.getConnection().query(`
        select * from assignment
        where "lessonId" = $1
        order by id 
      `, [lessonId]);
            return assignments;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => [AssignmentQuestion_1.AssignmentQuestion], { nullable: true }),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Assignment_1.Assignment]),
    __metadata("design:returntype", Promise)
], AssignmentResolver.prototype, "question", null);
__decorate([
    type_graphql_1.Query(() => [Assignment_1.Assignment]),
    __param(0, type_graphql_1.Arg("lessonId", () => Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssignmentResolver.prototype, "assignments", null);
AssignmentResolver = __decorate([
    type_graphql_1.Resolver(Assignment_1.Assignment)
], AssignmentResolver);
exports.AssignmentResolver = AssignmentResolver;
//# sourceMappingURL=assignment.js.map