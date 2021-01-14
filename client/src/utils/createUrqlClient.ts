import {
  Client,
  ClientOptions,
  createClient,
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import gql from "graphql-tag";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
  LogoutMutation,
  UpdateUserMutation,
  BecomeOrUpdateInstructorMutation,
  UpdateUserMutationVariables,
  User,
  PurchaseMutation,
  IsOwnQuery,
  IsOwnDocument,
  PostQuestionMutation,
  QuestionsQuery,
  QuestionsDocument,
  PurchaseMutationVariables,
  useIsOwnQuery,
  ChangeLanguageMutation,
  GetLanguageQuery,
  GetLanguageDocument,
  ChangeThemeMutation,
  GetThemeQuery,
  GetThemeDocument,
  useGetThemeQuery,
  ActivateAccountMutation,
  // RegisterMutation, LogoutMutation, VoteMutationVariables, DeletePostMutationVariables,
} from "../generated/graphql";
import { pipe, tap } from "wonka";
import {
  cacheExchange,
  Resolver,
  Cache,
  query,
} from "@urql/exchange-graphcache";
import { betterUpdateQuery } from "./betterUpdateQuery";

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

const cusorPagination = (query: string): Resolver => {
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
      query
    );
    info.partial = !isItInTheCache;
    const results: string[] = [];
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, query) as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });
    return {
      __typename: "PaginatedQuestion",
      hasMore,
      questions: results,
    };
  };
};

function invalidateMyCourse(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "myCourse");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "myCourse", fi.arguments || {});
  });
}

function invalidateAllQuestions(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "questions");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "questions", fi.arguments || {});
  });
}

function invalidateAllReplyQuestions(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "questions");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "replyQuestions", fi.arguments || {});
  });
}

function invalidateIsOwn(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "isOwn");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "isOwn", fi.arguments || {});
  });
}

export const createUrqlClient = () => {
  let cookie = "";
  // if (isServer()) {
  //   cookie = ctx?.req?.headers?.cookie;
  // }
  return createClient({
    url: "http://192.168.7.114:4000/graphql",
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
            questions: cusorPagination("questions"),
          },
        },
        updates: {
          Mutation: {
            changeTheme: (_result, _args, cache, _info) => {
              betterUpdateQuery<ChangeThemeMutation, GetThemeQuery>(
                cache,
                { query: GetThemeDocument },
                _result,
                (result, query) => {
                  return {
                    getTheme: result.changeTheme,
                  };
                }
              );
            },
            changeLanguage: (_result, _args, cache, _info) => {
              betterUpdateQuery<ChangeLanguageMutation, GetLanguageQuery>(
                cache,
                { query: GetLanguageDocument },
                _result,
                (result, query) => {
                  return {
                    getLanguage: result.changeLanguage,
                  };
                }
              );
            },
            postQuestion: (_result, _args, cache, _info) => {
              invalidateAllQuestions(cache);
            },

            postReplyQuestion: (_result, _args, cache, _info) => {
              invalidateAllReplyQuestions(cache);
            },

            purchase: (_result, _args, cache, _info) => {
              betterUpdateQuery<PurchaseMutation, IsOwnQuery>(
                cache,
                { query: IsOwnDocument },
                _result,
                (result, query) => {
                  if (result.purchase) {
                    return { isOwn: true };
                  } else
                    return {
                      isOwn: false,
                    };
                }
              );
              invalidateMyCourse(cache);
            },

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
                    phone,
                    username,
                  } = args as UpdateUserMutationVariables;
                  if (result.updateUser) {
                    const me = query.me;
                    return {
                      me: {
                        ...me,
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

            activateAccount: (_result, args, cache, _info) => {
              betterUpdateQuery<ActivateAccountMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.activateAccount) {
                    const me = query.me;
                    return {
                      me: {
                        ...me,
                        isActivated: true,
                      } as User,
                    };
                  } else {
                    return query;
                  }
                }
              );
            },

            becomeOrUpdateInstructor: (_result, _args, cache, _info) => {
              betterUpdateQuery<BecomeOrUpdateInstructorMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.becomeOrUpdateInstructor.errors) {
                    return query;
                  } else {
                    return {
                      me: result.becomeOrUpdateInstructor.user,
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
