import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  username: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Mutation = {
  __typename?: "Mutation";
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
  changePassword: UserResponse;
  forgotPassword: Scalars["Boolean"];
};

export type MutationRegisterArgs = {
  options: UserInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type UserInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
};

export type ErrorFragmentFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

export type UserFragmentFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "email"
>;

export type UserResponseFragmentFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & ErrorFragmentFragment>>;
  user?: Maybe<{ __typename?: "User" } & UserFragmentFragment>;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
  changePassword: {
    __typename?: "UserResponse";
  } & UserResponseFragmentFragment;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "[object Object]"
>;

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & UserResponseFragmentFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "[object Object]"
>;

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & UserResponseFragmentFragment;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & UserFragmentFragment>;
};

export const ErrorFragmentFragmentDoc = gql`
  fragment ErrorFragment on FieldError {
    field
    message
  }
`;
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    username
    email
  }
`;
export const UserResponseFragmentFragmentDoc = gql`
  fragment UserResponseFragment on UserResponse {
    errors {
      ...ErrorFragment
    }
    user {
      ...UserFragment
    }
  }
  ${ErrorFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterDocument = gql`
  mutation Register($options: UserInput!) {
    register(options: $options) {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
