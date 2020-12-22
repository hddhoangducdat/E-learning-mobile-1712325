import { Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  categories() {
    return Category.find();
  }
}
