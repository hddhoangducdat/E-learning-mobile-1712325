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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const validateRegister_1 = require("../utils/validateRegister");
const UserInput_1 = require("./UserInput");
const argon2_1 = __importDefault(require("argon2"));
const constances_1 = require("../constances");
const uuid_1 = require("uuid");
const FieldError_1 = require("./FieldError");
const Instructor_1 = require("../entities/Instructor");
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    email(user, { req }) {
        if (req.session.userId === user.id) {
            return user.email;
        }
        return "";
    }
    me({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const user = yield User_1.User.findOne(req.session.userId, {
                relations: ["instructor"],
            });
            return user;
        });
    }
    updateUser(email, username, phone, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validateRegister_1.validateRegister({
                email,
                phone,
                username,
                password: "dummyPassword",
            });
            if (errors) {
                return false;
            }
            yield User_1.User.update({ id: req.session.userId }, {
                email,
                phone,
                username,
            });
            return true;
        });
    }
    register(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validateRegister_1.validateRegister(options);
            if (errors) {
                return { errors };
            }
            const hashedPassword = yield argon2_1.default.hash(options.password);
            let user;
            try {
                user = yield User_1.User.create({
                    username: options.username,
                    password: hashedPassword,
                    email: options.email,
                    phone: options.phone,
                }).save();
            }
            catch (err) {
                if (err.code === "23505") {
                    return {
                        errors: [
                            {
                                field: "username",
                                message: "username already taken",
                            },
                        ],
                    };
                }
            }
            req.session.userId = user === null || user === void 0 ? void 0 : user.id;
            return { user };
        });
    }
    login(usernameOrEmail, password, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(usernameOrEmail.includes("@")
                ? {
                    where: {
                        email: usernameOrEmail,
                    },
                    relations: ["instructor"],
                }
                : {
                    where: {
                        username: usernameOrEmail,
                    },
                    relations: ["instructor"],
                });
            if (!user) {
                return {
                    errors: [
                        {
                            field: "usernameOrEmail",
                            message: "that username/email doesn't exist",
                        },
                    ],
                };
            }
            const valid = yield argon2_1.default.verify(user.password, password);
            if (!valid) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "incorrect password",
                        },
                    ],
                };
            }
            req.session.userId = user.id;
            return {
                user,
            };
        });
    }
    logout({ req, res }) {
        return new Promise((resolve) => {
            req.session.destroy((err) => {
                res.clearCookie(constances_1.COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    }
    changePassword(token, newPassword, { redis, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newPassword.length <= 2) {
                return {
                    errors: [
                        {
                            field: "newPassword",
                            message: "length must be greater than 2",
                        },
                    ],
                };
            }
            const key = constances_1.FORGET_PASSWORD_PREFIX + token;
            const userId = yield redis.get(key);
            if (!userId) {
                return {
                    errors: [
                        {
                            field: "token",
                            message: "token expired",
                        },
                    ],
                };
            }
            const user = yield User_1.User.findOne(parseInt(userId));
            if (!user) {
                return {
                    errors: [
                        {
                            field: "token",
                            message: "user no longer existed",
                        },
                    ],
                };
            }
            yield User_1.User.update({ id: parseInt(userId) }, {
                password: yield argon2_1.default.hash(newPassword),
            });
            yield redis.del(key);
            req.session.userId = user.id;
            return { user };
        });
    }
    instructor(instructorId) {
        return User_1.User.findOne({
            where: {
                instructorId,
            },
            relations: ["instructor"],
        });
    }
    forgotPassword(email, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return true;
            }
            const token = uuid_1.v4();
            const html = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`;
            yield redis.set(constances_1.FORGET_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 60);
            return true;
        });
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
            let user;
            try {
                user = yield User_1.User.findOne(req.session.userId);
                instructor = yield Instructor_1.Instructor.findOne(user === null || user === void 0 ? void 0 : user.instructorId);
                if (!instructor) {
                    instructor = yield Instructor_1.Instructor.create({
                        major,
                        intro,
                    }).save();
                    user.instructorId = instructor.id;
                    yield User_1.User.save(user);
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
            return {
                user: Object.assign(Object.assign({}, user), { instructor }),
            };
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "email", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("username")),
    __param(2, type_graphql_1.Arg("phone")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput_1.UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("usernameOrEmail")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Arg("newPassword")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Query(() => User_1.User),
    __param(0, type_graphql_1.Arg("instructorId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "instructor", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("major")),
    __param(1, type_graphql_1.Arg("intro")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "becomeOrUpdateInstructor", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map