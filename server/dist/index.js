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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        database: "ELearning",
        username: "noir",
        password: "1",
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, ".migrations/*")],
        entities: [User_1.User],
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
            resolvers: [user_1.UserResolver],
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