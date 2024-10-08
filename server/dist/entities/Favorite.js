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
exports.Favorite = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Course_1 = require("./Course");
const User_1 = require("./User");
let Favorite = class Favorite extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Favorite.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Favorite.prototype, "courseId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.favorite),
    __metadata("design:type", User_1.User)
], Favorite.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Course_1.Course, (course) => course.favorite),
    __metadata("design:type", Course_1.Course)
], Favorite.prototype, "course", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Favorite.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Favorite.prototype, "updatedAt", void 0);
Favorite = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Favorite);
exports.Favorite = Favorite;
//# sourceMappingURL=Favorite.js.map