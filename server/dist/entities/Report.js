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
exports.Report = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Course_1 = require("./Course");
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["SOLVED"] = "SOLVED";
})(Status || (Status = {}));
let Report = class Report extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Report.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.report),
    __metadata("design:type", User_1.User)
], Report.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Course_1.Course, (course) => course.report),
    __metadata("design:type", Course_1.Course)
], Report.prototype, "course", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Report.prototype, "subject", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING,
    }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Report.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Report.prototype, "updatedAt", void 0);
Report = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Report);
exports.Report = Report;
//# sourceMappingURL=Report.js.map