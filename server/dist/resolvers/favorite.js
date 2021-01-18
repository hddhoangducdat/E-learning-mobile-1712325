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
exports.FavoriteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Course_1 = require("../entities/Course");
const Favorite_1 = require("../entities/Favorite");
let FavoriteResolver = class FavoriteResolver {
    addToMyFavorite(courseId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                yield typeorm_1.getConnection().query(`
          insert into favorite ("userId", "courseId")
          values ($1, $2)
        `, [req.session.userId, courseId]);
                const course = yield Course_1.Course.find({
                    where: {
                        id: courseId,
                    },
                });
                return course[0];
            }
            else
                return null;
        });
    }
    myFavorite({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId) {
                const courses = yield typeorm_1.getConnection().query(`
          select * from course c
          inner join favorite f on f."courseId" = c.id and f."userId" = $1
        `, [req.session.userId]);
                console.log(courses);
                return courses;
            }
            return null;
        });
    }
    removeFromFavorite(courseId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.userId)
                yield Favorite_1.Favorite.delete({ courseId, userId: req.session.userId });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Course_1.Course, { nullable: true }),
    __param(0, type_graphql_1.Arg("courseId", () => Number)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "addToMyFavorite", null);
__decorate([
    type_graphql_1.Query(() => [Course_1.Course], { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "myFavorite", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("courseId", () => Number)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "removeFromFavorite", null);
FavoriteResolver = __decorate([
    type_graphql_1.Resolver(Favorite_1.Favorite)
], FavoriteResolver);
exports.FavoriteResolver = FavoriteResolver;
//# sourceMappingURL=favorite.js.map