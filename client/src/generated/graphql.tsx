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
  course?: Maybe<Course>;
  courses: PaginatedCourse;
  categories: Array<Category>;
  feedBacks: PaginatedFeedBack;
  reports: PaginatedReport;
  lessons: Array<Lesson>;
  lesson?: Maybe<Lesson>;
  questions: PaginatedQuestion;
  replyQuestions: PaginatedQuestion;
  resources: Array<Resource>;
  assignments: Array<Assignment>;
};


export type QueryCourseArgs = {
  id: Scalars['Int'];
};


export type QueryCoursesArgs = {
  search?: Maybe<Scalars['String']>;
  orderType?: Maybe<Scalars['String']>;
  isAsc?: Maybe<Scalars['Boolean']>;
  categoryId?: Maybe<Scalars['Float']>;
  cursor?: Maybe<Scalars['DateTime']>;
  limit: Scalars['Int'];
};


export type QueryFeedBacksArgs = {
  courseId?: Maybe<Scalars['Float']>;
  cursor?: Maybe<Scalars['DateTime']>;
  limit: Scalars['Int'];
};


export type QueryReportsArgs = {
  courseId?: Maybe<Scalars['Float']>;
  cursor?: Maybe<Scalars['DateTime']>;
  limit: Scalars['Int'];
};


export type QueryLessonsArgs = {
  sectionId: Scalars['Float'];
};


export type QueryLessonArgs = {
  lessonId: Scalars['Int'];
};


export type QueryQuestionsArgs = {
  lessonId: Scalars['Int'];
  cursor?: Maybe<Scalars['DateTime']>;
  limit: Scalars['Int'];
};


export type QueryReplyQuestionsArgs = {
  questionId: Scalars['Int'];
  cursor?: Maybe<Scalars['DateTime']>;
  limit: Scalars['Int'];
};


export type QueryResourcesArgs = {
  lessonId: Scalars['Float'];
};


export type QueryAssignmentsArgs = {
  lessonId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  avatar: Scalars['String'];
  type: Scalars['String'];
  isDelete: Scalars['Boolean'];
  isActivated: Scalars['Boolean'];
  instructorId: Scalars['Float'];
  instructor?: Maybe<Instructor>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Instructor = {
  __typename?: 'Instructor';
  id: Scalars['Float'];
  major: Scalars['String'];
  intro: Scalars['String'];
  skills: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Course = {
  __typename?: 'Course';
  id: Scalars['Float'];
  title: Scalars['String'];
  subtitle: Scalars['String'];
  price: Scalars['String'];
  description: Scalars['String'];
  requirement: Scalars['String'];
  learnWhat: Scalars['String'];
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
  categoryId: Scalars['Float'];
  category: Category;
  instructorId: Scalars['Float'];
  section: Array<Section>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float'];
  name: Scalars['String'];
  imageUrl: Scalars['String'];
  course: Array<Course>;
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Section = {
  __typename?: 'Section';
  id: Scalars['Float'];
  courseId: Scalars['Float'];
  numberOrder: Scalars['Float'];
  name: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PaginatedCourse = {
  __typename?: 'PaginatedCourse';
  courses: Array<Course>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedFeedBack = {
  __typename?: 'PaginatedFeedBack';
  feedBacks: Array<FeedBack>;
  hasMore: Scalars['Boolean'];
};

export type FeedBack = {
  __typename?: 'FeedBack';
  id: Scalars['Float'];
  rate: Scalars['Float'];
  subject: Scalars['String'];
  content: Scalars['String'];
  userId: Scalars['Float'];
  courseId: Scalars['Float'];
  isDeleted: Scalars['Boolean'];
  isResolved: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PaginatedReport = {
  __typename?: 'PaginatedReport';
  reports: Array<Report>;
  hasMore: Scalars['Boolean'];
};

export type Report = {
  __typename?: 'Report';
  id: Scalars['Float'];
  userId: Scalars['Float'];
  courseId: Scalars['Float'];
  subject: Scalars['String'];
  status: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Lesson = {
  __typename?: 'Lesson';
  id: Scalars['Float'];
  resource: Array<Resource>;
  assignment: Array<Assignment>;
  questions: Array<Question>;
  sectionId: Scalars['Float'];
  numberOrder: Scalars['Float'];
  name: Scalars['String'];
  content: Scalars['String'];
  video: Scalars['String'];
  captionName: Scalars['String'];
  times: Scalars['Float'];
  isPreview: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Resource = {
  __typename?: 'Resource';
  id: Scalars['Float'];
  lessonId: Scalars['Float'];
  name: Scalars['String'];
  url: Scalars['String'];
  type: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Assignment = {
  __typename?: 'Assignment';
  id: Scalars['Float'];
  lessonId: Scalars['Float'];
  type: Scalars['String'];
  code: Scalars['String'];
  anwser: Scalars['String'];
  time: Scalars['Float'];
  title: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  question?: Maybe<Array<AssignmentQuestion>>;
};

export type AssignmentQuestion = {
  __typename?: 'AssignmentQuestion';
  id: Scalars['Float'];
  assignmentId: Scalars['Float'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['Float'];
  userId: Scalars['Float'];
  lessonId: Scalars['Float'];
  repliedQuestionId: Scalars['Float'];
  content: Scalars['String'];
  votedNumber: Scalars['Float'];
  repliedNumber: Scalars['Float'];
  isResolved: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  tagIds: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type PaginatedQuestion = {
  __typename?: 'PaginatedQuestion';
  questions: Array<Question>;
  hasMore: Scalars['Boolean'];
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
  userPayForCourse: PayCourseResponse;
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


export type MutationUserPayForCourseArgs = {
  courseId: Scalars['Float'];
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

export type PayCourseResponse = {
  __typename?: 'PayCourseResponse';
  bill?: Maybe<StudentCourse>;
  errors?: Maybe<Array<FieldError>>;
};

export type StudentCourse = {
  __typename?: 'StudentCourse';
  userId: Scalars['Float'];
  courseId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
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

export type CourseQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { course?: Maybe<(
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'title' | 'subtitle' | 'price' | 'description' | 'requirement' | 'learnWhat' | 'soldNumber' | 'videoNumber' | 'rateNumber' | 'totalHours' | 'promoVidUrl' | 'formalityPoint' | 'contentPoint' | 'presentationPoint' | 'instructorId'>
    & { section: Array<(
      { __typename?: 'Section' }
      & Pick<Section, 'id' | 'name'>
    )> }
  )> }
);

export type CoursesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['DateTime']>;
  categoryId?: Maybe<Scalars['Float']>;
  isAsc?: Maybe<Scalars['Boolean']>;
  orderType?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
}>;


export type CoursesQuery = (
  { __typename?: 'Query' }
  & { courses: (
    { __typename?: 'PaginatedCourse' }
    & Pick<PaginatedCourse, 'hasMore'>
    & { courses: Array<(
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'title' | 'subtitle' | 'price' | 'soldNumber' | 'rateNumber' | 'categoryId' | 'imageUrl'>
      & { category: (
        { __typename?: 'Category' }
        & Pick<Category, 'imageUrl' | 'name'>
      ) }
    )> }
  ) }
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
export const CourseDocument = gql`
    query Course($id: Int!) {
  course(id: $id) {
    id
    title
    subtitle
    price
    description
    requirement
    learnWhat
    soldNumber
    videoNumber
    rateNumber
    totalHours
    promoVidUrl
    formalityPoint
    contentPoint
    presentationPoint
    instructorId
    section {
      id
      name
    }
  }
}
    `;

export function useCourseQuery(options: Omit<Urql.UseQueryArgs<CourseQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CourseQuery>({ query: CourseDocument, ...options });
};
export const CoursesDocument = gql`
    query Courses($limit: Int!, $cursor: DateTime, $categoryId: Float, $isAsc: Boolean, $orderType: String, $search: String) {
  courses(
    limit: $limit
    cursor: $cursor
    categoryId: $categoryId
    isAsc: $isAsc
    orderType: $orderType
    search: $search
  ) {
    courses {
      id
      title
      subtitle
      price
      soldNumber
      rateNumber
      categoryId
      imageUrl
      category {
        imageUrl
        name
      }
    }
    hasMore
  }
}
    `;

export function useCoursesQuery(options: Omit<Urql.UseQueryArgs<CoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CoursesQuery>({ query: CoursesDocument, ...options });
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