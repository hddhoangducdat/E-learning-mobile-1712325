"use strict";
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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
const express_1 = __importDefault(require("express"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const apollo_server_express_1 = require("apollo-server-express");
const constances_1 = require("./constances");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const UserAnswer_1 = require("./entities/UserAnswer");
const Report_1 = require("./entities/Report");
const Resource_1 = require("./entities/Resource");
const Section_1 = require("./entities/Section");
const Lesson_1 = require("./entities/Lesson");
const Instructor_1 = require("./entities/Instructor");
const FeedBack_1 = require("./entities/FeedBack");
const Course_1 = require("./entities/Course");
const Category_1 = require("./entities/Category");
const AssignmentQuestion_1 = require("./entities/AssignmentQuestion");
const Assignment_1 = require("./entities/Assignment");
const instructor_1 = require("./resolvers/instructor");
const Question_1 = require("./entities/Question");
const StudentCourse_1 = require("./entities/StudentCourse");
const course_1 = require("./resolvers/course");
const category_1 = require("./resolvers/category");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        database: "ELearning",
        host: "localhost",
        port: 5432,
        username: "noir",
        password: "1",
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        entities: [
            Course_1.Course,
            Section_1.Section,
            User_1.User,
            UserAnswer_1.UserAnswer,
            Report_1.Report,
            Resource_1.Resource,
            Lesson_1.Lesson,
            Instructor_1.Instructor,
            Question_1.Question,
            StudentCourse_1.StudentCourse,
            FeedBack_1.FeedBack,
            Category_1.Category,
            AssignmentQuestion_1.AssignmentQuestion,
            Assignment_1.Assignment,
        ],
    });
    yield conn.runMigrations();
    const app = express_1.default();
    let RedisStore = connect_redis_1.default(express_session_1.default);
    let redis = new ioredis_1.default();
    app.use(express_session_1.default({
        name: constances_1.COOKIE_NAME,
        store: new RedisStore({ client: redis, disableTouch: true }),
        secret: "asdfh29fheafdfasf2h3r123fhdsaf9",
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 2 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constances_1.__prod__,
        },
        saveUninitialized: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                user_1.UserResolver,
                instructor_1.InstructorResolver,
                course_1.CourseResolver,
                category_1.CategoryResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: true,
    });
    app.listen(4000, () => {
        console.log("server started on localhost 4000");
    });
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map