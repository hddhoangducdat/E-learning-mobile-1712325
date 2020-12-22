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
const Question_1 = require("./entities/Question");
const StudentCourse_1 = require("./entities/StudentCourse");
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
            User_1.User,
            UserAnswer_1.UserAnswer,
            Report_1.Report,
            Section_1.Section,
            Resource_1.Resource,
            Lesson_1.Lesson,
            Instructor_1.Instructor,
            Question_1.Question,
            StudentCourse_1.StudentCourse,
            FeedBack_1.FeedBack,
            Course_1.Course,
            Category_1.Category,
            AssignmentQuestion_1.AssignmentQuestion,
            Assignment_1.Assignment,
        ],
    });
    yield conn.runMigrations();
    const app = express_1.default();
    app.listen(4000, () => {
        console.log("server started on localhost 4000");
    });
});
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map