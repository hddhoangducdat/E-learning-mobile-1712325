import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { MyContext } from "../types";

export class SettingResolver {
  @Mutation(() => String)
  changeLanguage(@Arg("language") language: string, @Ctx() { req }: MyContext) {
    req.session.language = language;
    return req.session.language;
  }

  @Query(() => String)
  getLanguage(@Ctx() { req }: MyContext) {
    return req.session.language ? req.session.language : "english";
  }

  @Mutation(() => String)
  changeTheme(@Arg("theme") theme: string, @Ctx() { req }: MyContext) {
    req.session.theme = theme;
    return req.session.theme;
  }

  @Query(() => String)
  getTheme(@Ctx() { req }: MyContext) {
    return req.session.theme ? req.session.theme : "Light";
  }
}
