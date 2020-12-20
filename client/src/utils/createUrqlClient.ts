import {
  Client,
  ClientOptions,
  createClient,
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
  LogoutMutation,
  UpdateUserMutation,
  BecomeOrUpdateInstructorMutation,
  InstructorQuery,
  InstructorDocument,
  UpdateUserMutationVariables,
  User,
  // RegisterMutation, LogoutMutation, VoteMutationVariables, DeletePostMutationVariables,
} from "../generated/graphql";
import { pipe, tap } from "wonka";
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { TRIGGER_TAB_BAR } from "../../types";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        // Router.replace("/login");
      }
    })
  );
};

const cusorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "posts"
    );
    info.partial = !isItInTheCache;
    const results: string[] = [];
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });
    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments || {});
  });
}

export const createUrqlClient = () => {
  let cookie = "";
  // if (isServer()) {
  //   cookie = ctx?.req?.headers?.cookie;
  // }
  return createClient({
    url: "http://192.168.7.113:4000/graphql",
    fetchOptions: {
      credentials: "include",
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cusorPagination(),
          },
        },
        updates: {
          Mutation: {
            // deletePost: (_result, args, cache, _info) => {
            //   cache.invalidate({
            //     __typename: "Post",
            //     id: (args as DeletePostMutationVariables).id,
            //   });
            // },
            // vote: (_result, args, cache, _info) => {
            //   const { postId, value } = args as VoteMutationVariables;
            //   const data = cache.readFragment(
            //     gql`
            //       fragment _ on Post {
            //         id
            //         points
            //         voteStatus
            //       }
            //     `,
            //     { id: postId } as any
            //   );
            //   if (data) {
            //     if (data.voteStatus === value) {
            //       return;
            //     }
            //     const newPoints =
            //       (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
            //     cache.writeFragment(
            //       gql`
            //         fragment _ on Post {
            //           points
            //           voteStatus
            //         }
            //       `,
            //       { id: postId, points: newPoints, voteStatus: value } as any
            //     );
            //   }
            // },

            // createPost: (_result, _args, cache, _info) => {
            //   invalidateAllPosts(cache);
            // },

            login: (_result, _args, cache, _info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
              invalidateAllPosts(cache);
            },
            register: (_result, _args, cache, _info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },

            updateUser: (_result, args, cache, _info) => {
              betterUpdateQuery<UpdateUserMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  const {
                    email,
                    phone,
                    username,
                  } = args as UpdateUserMutationVariables;
                  if (result.updateUser) {
                    const me = query.me;
                    return {
                      me: {
                        ...me,
                        email,
                        username,
                        phone,
                      } as User,
                    };
                  } else {
                    return query;
                  }
                }
              );
            },

            becomeOrUpdateInstructor: (_result, _args, cache, _info) => {
              betterUpdateQuery<
                BecomeOrUpdateInstructorMutation,
                InstructorQuery
              >(
                cache,
                { query: InstructorDocument },
                _result,
                (result, query) => {
                  if (result.becomeOrUpdateInstructor.errors) {
                    return query;
                  } else {
                    return {
                      instructor: result.becomeOrUpdateInstructor.instructor,
                    };
                  }
                }
              );
            },

            logout: (_result, _args, cache, _info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
          },
        },
      }),
      errorExchange,
      // ssrExchange,
      fetchExchange,
    ],
  });
};
