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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Course_1 = require("./Course");
let Category = class Category extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Category.prototype, "imageUrl", void 0);
__decorate([
    type_graphql_1.Field(() => [Course_1.Course]),
    typeorm_1.OneToMany(() => Course_1.Course, (course) => course.category),
    __metadata("design:type", Array)
], Category.prototype, "course", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Category.prototype, "isDeleted", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Category.prototype, "updatedAt", void 0);
Category = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map