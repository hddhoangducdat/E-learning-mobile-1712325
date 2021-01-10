import { v2 } from "@google-cloud/translate";
import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  translate: v2.Translate;
  userLoader: ReturnType<typeof createUserLoader>;
};
