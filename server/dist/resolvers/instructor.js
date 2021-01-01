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
exports.InstructorResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Instructor_1 = require("../entities/Instructor");
const FieldError_1 = require("./FieldError");
let InstructorResponse = class InstructorResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], InstructorResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Instructor_1.Instructor, { nullable: true }),
    __metadata("design:type", Instructor_1.Instructor)
], InstructorResponse.prototype, "instructor", void 0);
InstructorResponse = __decorate([
    type_graphql_1.ObjectType()
], InstructorResponse);
let InstructorResolver = class InstructorResolver {
};
InstructorResolver = __decorate([
    type_graphql_1.Resolver(Instructor_1.Instructor)
], InstructorResolver);
exports.InstructorResolver = InstructorResolver;
//# sourceMappingURL=instructor.js.map