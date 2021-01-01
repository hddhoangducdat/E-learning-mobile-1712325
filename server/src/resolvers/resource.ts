import {
  Arg,
  Field,
  FieldResolver,
  Int,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Lesson } from "../entities/Lesson";
import { Resource } from "../entities/Resource";

@Resolver(Resource)
export class ResourceResolver {
  @Query(() => [Resource])
  async resources(
    @Arg("lessonId", () => Number) lessonId: number
  ): Promise<Resource[]> {
    const resources = await getConnection().query(
      `
        select * from resource
        where "lessonId" = $1
        order by id 
      `,
      [lessonId]
    );

    return resources;
  }
}
