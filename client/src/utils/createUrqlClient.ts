import {
  createClient,
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import _ from "lodash";
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
  ChangeLanguageMutation,
  GetLanguageQuery,
  GetLanguageDocument,
  ChangeThemeMutation,
  GetThemeQuery,
  GetThemeDocument,
  ActivateAccountMutation,
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
    let results: string[] = [];
    let hasMore = true;
    // console.log(fieldArgs);
    fieldInfos.forEach((fi) => {
      if (!stringifyVariables(fieldArgs).includes("cursor")) {
        if (_.isEqual(fi.arguments, fieldArgs)) {
          const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
          const data = cache.resolve(key, query) as string[];
          hasMore = cache.resolve(key, "hasMore") as boolean;
          results = [...data];
        }
      } else {
        if (
          !stringifyVariables(fieldArgs).includes("categoryId") &&
          !stringifyVariables(fi.arguments).includes("categoryId")
        ) {
          const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
          const data = cache.resolve(key, query) as string[];
          const _hasMore = cache.resolve(key, "hasMore");

          results.push(...data);
          if (!_hasMore) {
            hasMore = _hasMore as boolean;
          }
        } else {
          if (fi.arguments!.categoryId === fieldArgs.categoryId) {
            const key = cache.resolveFieldByKey(
              entityKey,
              fi.fieldKey
            ) as string;
            const data = cache.resolve(key, query) as string[];
            const _hasMore = cache.resolve(key, "hasMore");

            results.push(...data);
            if (!_hasMore) {
              hasMore = _hasMore as boolean;
            }
          }
        }
      }
    });
    return {
      __typename: "PaginatedCourse",
      hasMore,
      courses: results,
    };
  };
};

function invalidNoArgument(cache: Cache, fieldName: string) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);

  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", fieldName);
  });
}

function invalidWithArgument(cache: Cache, fieldName: string) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);

  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", fieldName, fi.arguments || {});
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
    url: "http://ac22493b1fe9.ngrok.io/graphql",
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
          PaginatedFeedBack: () => null,
        },
        resolvers: {
          // Query: {
          //   questions: cusorPagination("questions"),
          // },
          Query: {
            courses: cusorPagination("courses"),
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

            writeFeedBack: (_result, _args, cache, _info) => {
              invalidWithArgument(cache, "feedBacks");
            },

            postReplyQuestion: (_result, _args, cache, _info) => {
              invalidateAllReplyQuestions(cache);
            },

            trackLesson: (_result, _args, cache, _info) => {
              invalidWithArgument(cache, "getTrackLesson");
            },

            purchase: (_result, _args, cache, _info) => {
              invalidateIsOwn(cache);
              invalidNoArgument(cache, "myCourse");
            },

            saveHistory: (_result, _args, cache, _info) => {
              invalidNoArgument(cache, "getHistory");
            },

            removeHistory: (_result, _args, cache, _info) => {
              invalidNoArgument(cache, "getHistory");
            },

            addToMyFavorite: (_result, _args, cache, _info) => {
              // invalidWithArgument(cache, "courses");
              invalidNoArgument(cache, "myFavorite");
            },

            removeFromFavorite: (_result, _args, cache, _info) => {
              // invalidWithArgument(cache, "courses");
              invalidNoArgument(cache, "myFavorite");
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
              invalidWithArgument(cache, "courses");
              invalidWithArgument(cache, "course");
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
              invalidWithArgument(cache, "courses");
              invalidWithArgument(cache, "course");
              invalidNoArgument(cache, "myFavorite");
              invalidNoArgument(cache, "myCourse");
              invalidNoArgument(cache, "getHistory");
              invalidWithArgument(cache, "getTrackLesson");
              invalidWithArgument(cache, "feedBacks");
              invalidWithArgument(cache, "feedBacks");
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
