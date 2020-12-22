import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'Query';
  me?: Maybe<User>;
  categories: Array<Category>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  avatar: Scalars['String'];
  type: Scalars['String'];
  isDelete: Scalars['Boolean'];
  isActivated: Scalars['Boolean'];
  instructorId?: Maybe<Scalars['String']>;
  instructor?: Maybe<Instructor>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Instructor = {
  __typename?: 'Instructor';
  id: Scalars['String'];
  major: Scalars['String'];
  intro: Scalars['String'];
  skills: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  course: Array<Course>;
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['String'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  price: Scalars['Float'];
  description: Scalars['String'];
  requirement: Scalars['String'];
  learnWhat: Array<Scalars['String']>;
  soldNumber: Scalars['Float'];
  videoNumber: Scalars['Float'];
  rateNumber: Scalars['Float'];
  totalHours: Scalars['Float'];
  formalityPoint: Scalars['Float'];
  contentPoint: Scalars['Float'];
  presentationPoint: Scalars['Float'];
  imageUrl: Scalars['String'];
  promoVidUrl: Scalars['String'];
  status: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  isHidden: Scalars['Boolean'];
  categoryId: Scalars['String'];
  category: Category;
  instructorId: Scalars['String'];
  section: Array<Section>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Section = {
  __typename?: 'Section';
  id: Scalars['String'];
  courseId: Scalars['String'];
  numberOrder: Scalars['Float'];
  name: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  becomeOrUpdateInstructor: UserResponse;
};


export type MutationUpdateUserArgs = {
  phone: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationBecomeOrUpdateInstructorArgs = {
  intro: Scalars['String'];
  major: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
};

export type ErrorFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type InstructorFragmentFragment = (
  { __typename?: 'Instructor' }
  & Pick<Instructor, 'id' | 'major' | 'intro' | 'skills'>
);

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'avatar' | 'phone'>
  & { instructor?: Maybe<(
    { __typename?: 'Instructor' }
    & InstructorFragmentFragment
  )> }
);

export type UserResponseFragmentFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragmentFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type BecomeOrUpdateInstructorMutationVariables = Exact<{
  major: Scalars['String'];
  intro: Scalars['String'];
}>;


export type BecomeOrUpdateInstructorMutation = (
  { __typename?: 'Mutation' }
  & { becomeOrUpdateInstructor: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFragmentFragment
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUser'>
);

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'imageUrl' | 'name'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
export const InstructorFragmentFragmentDoc = gql`
    fragment InstructorFragment on Instructor {
  id
  major
  intro
  skills
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  email
  avatar
  phone
  instructor {
    ...InstructorFragment
  }
}
    ${InstructorFragmentFragmentDoc}`;
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
${UserFragmentFragmentDoc}`;
export const BecomeOrUpdateInstructorDocument = gql`
    mutation BecomeOrUpdateInstructor($major: String!, $intro: String!) {
  becomeOrUpdateInstructor(major: $major, intro: $intro) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useBecomeOrUpdateInstructorMutation() {
  return Urql.useMutation<BecomeOrUpdateInstructorMutation, BecomeOrUpdateInstructorMutationVariables>(BecomeOrUpdateInstructorDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserInput!) {
  register(options: $options) {
    ...UserResponseFragment
  }
}
    ${UserResponseFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($username: String!, $email: String!, $phone: String!) {
  updateUser(username: $username, email: $email, phone: $phone)
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    imageUrl
    name
  }
}
    `;

export function useCategoriesQuery(options: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CategoriesQuery>({ query: CategoriesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};