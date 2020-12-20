import "reflect-metadata";
import { createConnection } from "typeorm";
import path from "path";
import { User } from "./entities/User";
import express from "express";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { COOKIE_NAME, __prod__ } from "./constances";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { UserAnswer } from "./entities/UserAnswer";
import { Report } from "./entities/Report";
import { Resource } from "./entities/Resource";
import { Section } from "./entities/Section";
import { Lesson } from "./entities/Lesson";
import { Instructor } from "./entities/Instructor";
import { ForumQuestion } from "./entities/ForumQuestion";
import { Feedback } from "./entities/Feedback";
import { Course } from "./entities/Course";
import { Category } from "./entities/Category";
import { AssignmentQuestion } from "./entities/AssignmentQuestion";
import { Assignment } from "./entities/Assignment";
import { InstructorResolver } from "./resolvers/instructor";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "ELearning",
    username: "noir",
    password: "1",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, ".migrations/*")],
    entities: [
      User,
      UserAnswer,
      Report,
      Section,
      Resource,
      Lesson,
      Instructor,
      ForumQuestion,
      Feedback,
      Course,
      Category,
      AssignmentQuestion,
      Assignment,
    ],
  });

  await conn.runMigrations();

  const app = express();

  let RedisStore = connectRedis(session);
  let redis = new Redis();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: "asdfh29fheafdfasf2h3r123fhdsaf9",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 2 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, InstructorResolver],
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
};

main().catch((err) => {
  console.log(err);
});
