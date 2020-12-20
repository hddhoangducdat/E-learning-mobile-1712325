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
    instructor({ req }) {
        if (!req.session.userId) {
            return null;
        }
        return Instructor_1.Instructor.findOne(req.session.userId);
    }
    becomeOrUpdateInstructor(major, intro, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (major === "") {
                return {
                    errors: [
                        {
                            field: "major",
                            message: "major can't be empty",
                        },
                    ],
                };
            }
            if (intro === "") {
                return {
                    errors: [
                        {
                            field: "intro",
                            message: "intro can't be empty",
                        },
                    ],
                };
            }
            let instructor;
            try {
                instructor = yield Instructor_1.Instructor.findOne(req.session.userId);
                if (!instructor) {
                    instructor = yield Instructor_1.Instructor.create({
                        id: req.session.userId,
                        major,
                        intro,
                    }).save();
                }
                else {
                    instructor.major = major;
                    instructor.intro = intro;
                    yield Instructor_1.Instructor.save(instructor);
                }
            }
            catch (err) {
                console.log(err);
            }
            return { instructor };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Instructor_1.Instructor, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InstructorResolver.prototype, "instructor", null);
__decorate([
    type_graphql_1.Mutation(() => InstructorResponse),
    __param(0, type_graphql_1.Arg("major")),
    __param(1, type_graphql_1.Arg("intro")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], InstructorResolver.prototype, "becomeOrUpdateInstructor", null);
InstructorResolver = __decorate([
    type_graphql_1.Resolver(Instructor_1.Instructor)
], InstructorResolver);
exports.InstructorResolver = InstructorResolver;
//# sourceMappingURL=instructor.js.map