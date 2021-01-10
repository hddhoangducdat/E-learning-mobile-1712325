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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingResolver = void 0;
const type_graphql_1 = require("type-graphql");
class SettingResolver {
    changeLanguage(language, { req }) {
        req.session.language = language;
        return req.session.language;
    }
    getLanguage({ req }) {
        return req.session.language ? req.session.language : "english";
    }
    changeTheme(theme, { req }) {
        req.session.theme = theme;
        return req.session.theme;
    }
    getTheme({ req }) {
        return req.session.theme ? req.session.theme : "Light";
    }
}
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg("language")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SettingResolver.prototype, "changeLanguage", null);
__decorate([
    type_graphql_1.Query(() => String),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SettingResolver.prototype, "getLanguage", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg("theme")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SettingResolver.prototype, "changeTheme", null);
__decorate([
    type_graphql_1.Query(() => String),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SettingResolver.prototype, "getTheme", null);
exports.SettingResolver = SettingResolver;
//# sourceMappingURL=setting.js.map