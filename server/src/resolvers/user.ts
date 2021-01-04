import { User, UserType } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { MyContext } from "../types";
import { validateRegister } from "../utils/validateRegister";
import { UserInput } from "./UserInput";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constances";
import { v4 } from "uuid";
import { FieldError } from "./FieldError";
import { Instructor } from "../entities/Instructor";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email.toLowerCase();
    }
    return "";
  }

  // @FieldResolver(() => User)
  // creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
  //   return userLoader.load(post.creatorId);
  // }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    const user = await User.findOne(req.session.userId, {
      relations: ["instructor"],
    });
    return user;
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("phone") phone: string,
    @Ctx() { req }: MyContext
  ) {
    const errors = validateRegister({
      email: email.toLowerCase(),
      phone,
      username,
      password: "dummyPassword",
    });
    if (errors) {
      // return errors;
      return false;
    }
    await User.update(
      { id: req.session.userId },
      {
        email,
        phone,
        username,
      }
    );

    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      user = await User.create({
        username: options.username,
        password: hashedPassword,
        email: options.email.toLowerCase(),
        phone: options.phone,
      }).save();
    } catch (err) {
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

    req.session.userId = user?.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? {
            where: {
              email: usernameOrEmail.toLowerCase(),
            },
            relations: ["instructor"],
          }
        : {
            where: {
              username: usernameOrEmail,
            },
            relations: ["instructor"],
          }
    );
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
    const valid = await argon2.verify(user.password, password);

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
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ) {
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
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
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

    const user = await User.findOne(parseInt(userId));

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

    await User.update(
      { id: parseInt(userId) },
      {
        password: await argon2.hash(newPassword),
      }
    );

    await redis.del(key);

    req.session.userId = user.id;
    return { user };
  }

  @Query(() => User)
  instructor(@Arg("instructorId") instructorId: number) {
    return User.findOne({
      where: {
        instructorId,
      },
      relations: ["instructor"],
    });
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return true;
    }
    const token = v4();
    const html = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`;
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60
    );
    // await sendEmail(email, html);
    return true;
  }

  @Mutation(() => UserResponse)
  async becomeOrUpdateInstructor(
    @Arg("major") major: string,
    @Arg("intro") intro: string,
    @Ctx() { req }: MyContext
  ) {
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
      user = await User.findOne(req.session.userId);
      instructor = await Instructor.findOne(user?.instructorId);
      if (!instructor) {
        instructor = await Instructor.create({
          major,
          intro,
        }).save();

        user!.instructorId = instructor.id;
        await User.save(user!);
      } else {
        instructor.major = major;
        instructor.intro = intro;
        await Instructor.save(instructor);
      }
    } catch (err) {
      console.log(err);
    }

    return {
      user: {
        ...user,
        instructor,
      },
    };
  }
}
