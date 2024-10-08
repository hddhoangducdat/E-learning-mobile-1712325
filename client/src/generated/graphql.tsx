import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
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
  instructor: User;
  getHistory: Array<Scalars["String"]>;
  isOwn: Scalars["Boolean"];
  course?: Maybe<Course>;
  getTrackCourse?: Maybe<TrackingCourse>;
  recommend: Array<Course>;
  coursesPresent: PaginatedCourse;
  courses: PaginatedCourse;
  myCourse?: Maybe<Array<Course>>;
  categories: Array<Category>;
  feedBacks: PaginatedFeedBack;
  reports: PaginatedReport;
  lessons: Array<Lesson>;
  latestLesson?: Maybe<Lesson>;
  getTrackLesson?: Maybe<TrackingLesson>;
  lesson?: Maybe<Lesson>;
  questions: PaginatedQuestion;
  replyQuestions: PaginatedQuestion;
  resources: Array<Resource>;
  assignments: Array<Assignment>;
  getLanguage: Scalars["String"];
  getTheme: Scalars["String"];
  myFavorite?: Maybe<Array<Course>>;
};

export type QueryInstructorArgs = {
  instructorId: Scalars["Float"];
};

export type QueryIsOwnArgs = {
  courseId: Scalars["Int"];
};

export type QueryCourseArgs = {
  id: Scalars["Int"];
};

export type QueryGetTrackCourseArgs = {
  courseId: Scalars["Int"];
};

export type QueryCoursesPresentArgs = {
  search?: Maybe<Scalars["String"]>;
  orderType?: Maybe<Scalars["String"]>;
  isAsc?: Maybe<Scalars["Boolean"]>;
  categoryId?: Maybe<Scalars["Float"]>;
  limit: Scalars["Int"];
};

export type QueryCoursesArgs = {
  search?: Maybe<Scalars["String"]>;
  orderType?: Maybe<Scalars["String"]>;
  isAsc?: Maybe<Scalars["Boolean"]>;
  categoryId?: Maybe<Scalars["Float"]>;
  cursor?: Maybe<Scalars["DateTime"]>;
  limit: Scalars["Int"];
};

export type QueryFeedBacksArgs = {
  courseId?: Maybe<Scalars["Float"]>;
  cursor?: Maybe<Scalars["DateTime"]>;
  limit: Scalars["Int"];
};

export type QueryReportsArgs = {
  courseId?: Maybe<Scalars["Float"]>;
  cursor?: Maybe<Scalars["DateTime"]>;
  limit: Scalars["Int"];
};

export type QueryLessonsArgs = {
  sectionId: Scalars["Float"];
};

export type QueryGetTrackLessonArgs = {
  lessonId: Scalars["Int"];
};

export type QueryLessonArgs = {
  lessonId: Scalars["Int"];
};

export type QueryQuestionsArgs = {
  lessonId: Scalars["Int"];
  cursor?: Maybe<Scalars["DateTime"]>;
  limit: Scalars["Int"];
};

export type QueryReplyQuestionsArgs = {
  questionId: Scalars["Int"];
  cursor?: Maybe<Scalars["DateTime"]>;
  limit: Scalars["Int"];
};

export type QueryResourcesArgs = {
  lessonId: Scalars["Float"];
};

export type QueryAssignmentsArgs = {
  lessonId: Scalars["Float"];
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  username: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
  avatar: Scalars["String"];
  type: Scalars["String"];
  isDelete: Scalars["Boolean"];
  isActivated: Scalars["Boolean"];
  instructorId: Scalars["Float"];
  instructor?: Maybe<Instructor>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Instructor = {
  __typename?: "Instructor";
  id: Scalars["Float"];
  major: Scalars["String"];
  intro: Scalars["String"];
  skills: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Course = {
  __typename?: "Course";
  id: Scalars["Float"];
  title: Scalars["String"];
  subtitle: Scalars["String"];
  price: Scalars["String"];
  description: Scalars["String"];
  requirement: Scalars["String"];
  learnWhat: Scalars["String"];
  soldNumber: Scalars["Float"];
  videoNumber: Scalars["Float"];
  rateNumber: Scalars["Float"];
  totalHours: Scalars["Float"];
  formalityPoint: Scalars["Float"];
  contentPoint: Scalars["Float"];
  presentationPoint: Scalars["Float"];
  imageUrl: Scalars["String"];
  promoVidUrl: Scalars["String"];
  status: Scalars["String"];
  isDeleted: Scalars["Boolean"];
  isHidden: Scalars["Boolean"];
  categoryId: Scalars["Float"];
  category: Category;
  track: Array<TrackingCourse>;
  favorite: Favorite;
  instructorId: Scalars["Float"];
  section: Array<Section>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Category = {
  __typename?: "Category";
  id: Scalars["Float"];
  name: Scalars["String"];
  imageUrl: Scalars["String"];
  course: Array<Course>;
  isDeleted: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type TrackingCourse = {
  __typename?: "TrackingCourse";
  userId: Scalars["Float"];
  courseId: Scalars["Float"];
  lessonId: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Favorite = {
  __typename?: "Favorite";
  userId: Scalars["Float"];
  courseId: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  category: Category;
};

export type Section = {
  __typename?: "Section";
  id: Scalars["Float"];
  courseId: Scalars["Float"];
  numberOrder: Scalars["Float"];
  name: Scalars["String"];
  isDeleted: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type PaginatedCourse = {
  __typename?: "PaginatedCourse";
  courses: Array<Course>;
  hasMore: Scalars["Boolean"];
};

export type PaginatedFeedBack = {
  __typename?: "PaginatedFeedBack";
  feedBacks: Array<FeedBack>;
  hasMore: Scalars["Boolean"];
};

export type FeedBack = {
  __typename?: "FeedBack";
  id: Scalars["Float"];
  rate: Scalars["Float"];
  subject: Scalars["String"];
  content: Scalars["String"];
  userId: Scalars["Float"];
  courseId: Scalars["Float"];
  isDeleted: Scalars["Boolean"];
  isResolved: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type PaginatedReport = {
  __typename?: "PaginatedReport";
  reports: Array<Report>;
  hasMore: Scalars["Boolean"];
};

export type Report = {
  __typename?: "Report";
  id: Scalars["Float"];
  userId: Scalars["Float"];
  courseId: Scalars["Float"];
  subject: Scalars["String"];
  status: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type Lesson = {
  __typename?: "Lesson";
  id: Scalars["Float"];
  resource: Array<Resource>;
  assignment: Array<Assignment>;
  questions: Array<Question>;
  track: Array<TrackingLesson>;
  sectionId: Scalars["Float"];
  numberOrder: Scalars["Float"];
  name: Scalars["String"];
  content: Scalars["String"];
  video: Scalars["String"];
  captionName: Scalars["String"];
  times: Scalars["Float"];
  isPreview: Scalars["Boolean"];
  isDeleted: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  section: Section;
};

export type Resource = {
  __typename?: "Resource";
  id: Scalars["Float"];
  lessonId: Scalars["Float"];
  name: Scalars["String"];
  url: Scalars["String"];
  type: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Assignment = {
  __typename?: "Assignment";
  id: Scalars["Float"];
  lessonId: Scalars["Float"];
  type: Scalars["String"];
  code: Scalars["String"];
  anwser: Scalars["String"];
  time: Scalars["Float"];
  title: Scalars["String"];
  isDeleted: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  question?: Maybe<Array<AssignmentQuestion>>;
};

export type AssignmentQuestion = {
  __typename?: "AssignmentQuestion";
  id: Scalars["Float"];
  assignmentId: Scalars["Float"];
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Question = {
  __typename?: "Question";
  id: Scalars["Float"];
  userId: Scalars["Float"];
  lessonId: Scalars["Float"];
  repliedQuestionId: Scalars["Float"];
  content: Scalars["String"];
  votedNumber: Scalars["Float"];
  repliedNumber: Scalars["Float"];
  isResolved: Scalars["Boolean"];
  isPublished: Scalars["Boolean"];
  tagIds: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type TrackingLesson = {
  __typename?: "TrackingLesson";
  userId: Scalars["Float"];
  lessonId: Scalars["Float"];
  time: Scalars["Float"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type PaginatedQuestion = {
  __typename?: "PaginatedQuestion";
  questions: Array<Question>;
  hasMore: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  updateUser: Scalars["Boolean"];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
  changePassword: UserResponse;
  activateAccount: UserResponse;
  forgotPassword: Scalars["Boolean"];
  requestActivate: Scalars["Boolean"];
  becomeOrUpdateInstructor: UserResponse;
  saveHistory: Scalars["Boolean"];
  removeHistory: Scalars["Boolean"];
  removeTrackCourse: Scalars["Boolean"];
  trackCourse?: Maybe<TrackingCourse>;
  purchase?: Maybe<Course>;
  writeFeedBack: Scalars["Boolean"];
  trackLesson?: Maybe<TrackingLesson>;
  postQuestion: Question;
  postReplyQuestion: Question;
  changeLanguage: Scalars["String"];
  changeTheme: Scalars["String"];
  addToMyFavorite?: Maybe<Scalars["Boolean"]>;
  removeFromFavorite: Scalars["Boolean"];
};

export type MutationUpdateUserArgs = {
  phone?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
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

export type MutationActivateAccountArgs = {
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  token: Scalars["String"];
  email: Scalars["String"];
};

export type MutationRequestActivateArgs = {
  token: Scalars["String"];
  email: Scalars["String"];
};

export type MutationBecomeOrUpdateInstructorArgs = {
  intro: Scalars["String"];
  major: Scalars["String"];
};

export type MutationSaveHistoryArgs = {
  search: Scalars["String"];
};

export type MutationRemoveHistoryArgs = {
  search: Scalars["String"];
};

export type MutationRemoveTrackCourseArgs = {
  courseId: Scalars["Int"];
};

export type MutationTrackCourseArgs = {
  lessonId: Scalars["Float"];
  courseId: Scalars["Float"];
};

export type MutationPurchaseArgs = {
  courseId: Scalars["Float"];
};

export type MutationWriteFeedBackArgs = {
  courseId: Scalars["Int"];
  rate: Scalars["Int"];
  content: Scalars["String"];
};

export type MutationTrackLessonArgs = {
  time: Scalars["Float"];
  lessonId: Scalars["Float"];
};

export type MutationPostQuestionArgs = {
  content: Scalars["String"];
  lessonId: Scalars["Int"];
};

export type MutationPostReplyQuestionArgs = {
  content: Scalars["String"];
  repliedQuestionId: Scalars["Int"];
  lessonId: Scalars["Int"];
};

export type MutationChangeLanguageArgs = {
  language: Scalars["String"];
};

export type MutationChangeThemeArgs = {
  theme: Scalars["String"];
};

export type MutationAddToMyFavoriteArgs = {
  courseId: Scalars["Float"];
};

export type MutationRemoveFromFavoriteArgs = {
  courseId: Scalars["Float"];
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

export type CategoryFragmentFragment = { __typename?: "Category" } & Pick<
  Category,
  "id" | "imageUrl" | "name"
>;

export type CourseFragmentFragment = { __typename?: "Course" } & Pick<
  Course,
  | "id"
  | "title"
  | "subtitle"
  | "price"
  | "description"
  | "requirement"
  | "learnWhat"
  | "soldNumber"
  | "videoNumber"
  | "rateNumber"
  | "totalHours"
  | "promoVidUrl"
  | "formalityPoint"
  | "contentPoint"
  | "presentationPoint"
  | "instructorId"
  | "imageUrl"
  | "createdAt"
>;

export type ErrorFragmentFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

export type FavoriteFragmentFragment = { __typename?: "Favorite" } & Pick<
  Favorite,
  "userId"
>;

export type InstructorFragmentFragment = { __typename?: "Instructor" } & Pick<
  Instructor,
  "id" | "major" | "intro" | "skills"
>;

export type LessonFragmentFragment = { __typename?: "Lesson" } & Pick<
  Lesson,
  "id" | "name" | "content" | "video" | "captionName" | "times"
>;

export type QuestionFragmentFragment = { __typename?: "Question" } & Pick<
  Question,
  "id" | "content" | "votedNumber" | "repliedNumber"
> & { user: { __typename?: "User" } & UserFragmentFragment };

export type TrackingCourseFragmentFragment = {
  __typename?: "TrackingCourse";
} & Pick<TrackingCourse, "userId" | "lessonId">;

export type TrackingLessonFragmentFragment = {
  __typename?: "TrackingLesson";
} & Pick<TrackingLesson, "userId" | "lessonId" | "time">;

export type UserFragmentFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "email" | "avatar" | "phone" | "isActivated"
> & {
    instructor?: Maybe<
      { __typename?: "Instructor" } & InstructorFragmentFragment
    >;
  };

export type UserResponseFragmentFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & ErrorFragmentFragment>>;
  user?: Maybe<{ __typename?: "User" } & UserFragmentFragment>;
};

export type ActivateAccountMutationVariables = Exact<{
  token: Scalars["String"];
}>;

export type ActivateAccountMutation = { __typename?: "Mutation" } & {
  activateAccount: {
    __typename?: "UserResponse";
  } & UserResponseFragmentFragment;
};

export type AddToMyFavoriteMutationVariables = Exact<{
  courseId: Scalars["Float"];
}>;

export type AddToMyFavoriteMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "addToMyFavorite"
>;

export type BecomeOrUpdateInstructorMutationVariables = Exact<{
  major: Scalars["String"];
  intro: Scalars["String"];
}>;

export type BecomeOrUpdateInstructorMutation = { __typename?: "Mutation" } & {
  becomeOrUpdateInstructor: {
    __typename?: "UserResponse";
  } & UserResponseFragmentFragment;
};

export type ChangeLanguageMutationVariables = Exact<{
  language: Scalars["String"];
}>;

export type ChangeLanguageMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "changeLanguage"
>;

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
  changePassword: {
    __typename?: "UserResponse";
  } & UserResponseFragmentFragment;
};

export type ChangeThemeMutationVariables = Exact<{
  theme: Scalars["String"];
}>;

export type ChangeThemeMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "changeTheme"
>;

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
  token: Scalars["String"];
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
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
  "logout"
>;

export type PostQuestionMutationVariables = Exact<{
  content: Scalars["String"];
  lessonId: Scalars["Int"];
}>;

export type PostQuestionMutation = { __typename?: "Mutation" } & {
  postQuestion: { __typename?: "Question" } & QuestionFragmentFragment;
};

export type PostReplyQuestionMutationVariables = Exact<{
  content: Scalars["String"];
  lessonId: Scalars["Int"];
  repliedQuestionId: Scalars["Int"];
}>;

export type PostReplyQuestionMutation = { __typename?: "Mutation" } & {
  postReplyQuestion: { __typename?: "Question" } & QuestionFragmentFragment;
};

export type PurchaseMutationVariables = Exact<{
  courseId: Scalars["Float"];
}>;

export type PurchaseMutation = { __typename?: "Mutation" } & {
  purchase?: Maybe<{ __typename?: "Course" } & CourseFragmentFragment>;
};

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & UserResponseFragmentFragment;
};

export type RemoveFromFavoriteMutationVariables = Exact<{
  courseId: Scalars["Float"];
}>;

export type RemoveFromFavoriteMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "removeFromFavorite"
>;

export type RemoveHistoryMutationVariables = Exact<{
  search: Scalars["String"];
}>;

export type RemoveHistoryMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "removeHistory"
>;

export type RemoveTrackCourseMutationVariables = Exact<{
  courseId: Scalars["Int"];
}>;

export type RemoveTrackCourseMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "removeTrackCourse"
>;

export type RequestActivateMutationVariables = Exact<{
  email: Scalars["String"];
  token: Scalars["String"];
}>;

export type RequestActivateMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "requestActivate"
>;

export type SaveHistoryMutationVariables = Exact<{
  search: Scalars["String"];
}>;

export type SaveHistoryMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "saveHistory"
>;

export type TrackCourseMutationVariables = Exact<{
  lessonId: Scalars["Float"];
  courseId: Scalars["Float"];
}>;

export type TrackCourseMutation = { __typename?: "Mutation" } & {
  trackCourse?: Maybe<
    { __typename?: "TrackingCourse" } & TrackingCourseFragmentFragment
  >;
};

export type TrackLessonMutationVariables = Exact<{
  lessonId: Scalars["Float"];
  time: Scalars["Float"];
}>;

export type TrackLessonMutation = { __typename?: "Mutation" } & {
  trackLesson?: Maybe<
    { __typename?: "TrackingLesson" } & TrackingLessonFragmentFragment
  >;
};

export type UpdateUserMutationVariables = Exact<{
  username: Scalars["String"];
  phone: Scalars["String"];
}>;

export type UpdateUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateUser"
>;

export type WriteFeedBackMutationVariables = Exact<{
  courseId: Scalars["Int"];
  rate: Scalars["Int"];
  content: Scalars["String"];
}>;

export type WriteFeedBackMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "writeFeedBack"
>;

export type AssignmentsQueryVariables = Exact<{
  lessonId: Scalars["Float"];
}>;

export type AssignmentsQuery = { __typename?: "Query" } & {
  assignments: Array<
    { __typename?: "Assignment" } & Pick<
      Assignment,
      "id" | "type" | "code" | "anwser" | "time" | "title"
    > & {
        question?: Maybe<
          Array<
            { __typename?: "AssignmentQuestion" } & Pick<
              AssignmentQuestion,
              "id" | "content"
            >
          >
        >;
      }
  >;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = { __typename?: "Query" } & {
  categories: Array<
    { __typename?: "Category" } & Pick<Category, "id" | "imageUrl" | "name">
  >;
};

export type CourseQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type CourseQuery = { __typename?: "Query" } & {
  course?: Maybe<
    { __typename?: "Course" } & {
      section: Array<{ __typename?: "Section" } & Pick<Section, "id" | "name">>;
    } & CourseFragmentFragment
  >;
};

export type CoursesQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["DateTime"]>;
  categoryId?: Maybe<Scalars["Float"]>;
  isAsc?: Maybe<Scalars["Boolean"]>;
  orderType?: Maybe<Scalars["String"]>;
  search?: Maybe<Scalars["String"]>;
}>;

export type CoursesQuery = { __typename?: "Query" } & {
  courses: { __typename?: "PaginatedCourse" } & Pick<
    PaginatedCourse,
    "hasMore"
  > & {
      courses: Array<
        { __typename?: "Course" } & {
          category: { __typename?: "Category" } & Pick<
            Category,
            "id" | "imageUrl" | "name"
          >;
          favorite: { __typename?: "Favorite" } & FavoriteFragmentFragment;
        } & CourseFragmentFragment
      >;
    };
};

export type CoursesPresentQueryVariables = Exact<{
  limit: Scalars["Int"];
  categoryId?: Maybe<Scalars["Float"]>;
  isAsc?: Maybe<Scalars["Boolean"]>;
  orderType?: Maybe<Scalars["String"]>;
  search?: Maybe<Scalars["String"]>;
}>;

export type CoursesPresentQuery = { __typename?: "Query" } & {
  coursesPresent: { __typename?: "PaginatedCourse" } & Pick<
    PaginatedCourse,
    "hasMore"
  > & {
      courses: Array<
        { __typename?: "Course" } & {
          category: { __typename?: "Category" } & Pick<
            Category,
            "id" | "imageUrl" | "name"
          >;
          favorite: { __typename?: "Favorite" } & FavoriteFragmentFragment;
        } & CourseFragmentFragment
      >;
    };
};

export type FeedBacksQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["DateTime"]>;
  courseId: Scalars["Float"];
}>;

export type FeedBacksQuery = { __typename?: "Query" } & {
  feedBacks: { __typename?: "PaginatedFeedBack" } & Pick<
    PaginatedFeedBack,
    "hasMore"
  > & {
      feedBacks: Array<
        { __typename?: "FeedBack" } & Pick<
          FeedBack,
          "id" | "rate" | "subject" | "content" | "userId" | "createdAt"
        > & {
            user: { __typename?: "User" } & Pick<
              User,
              "id" | "username" | "avatar"
            >;
          }
      >;
    };
};

export type GetHistoryQueryVariables = Exact<{ [key: string]: never }>;

export type GetHistoryQuery = { __typename?: "Query" } & Pick<
  Query,
  "getHistory"
>;

export type GetLanguageQueryVariables = Exact<{ [key: string]: never }>;

export type GetLanguageQuery = { __typename?: "Query" } & Pick<
  Query,
  "getLanguage"
>;

export type GetThemeQueryVariables = Exact<{ [key: string]: never }>;

export type GetThemeQuery = { __typename?: "Query" } & Pick<Query, "getTheme">;

export type GetTrackCourseQueryVariables = Exact<{
  courseId: Scalars["Int"];
}>;

export type GetTrackCourseQuery = { __typename?: "Query" } & {
  getTrackCourse?: Maybe<
    { __typename?: "TrackingCourse" } & TrackingCourseFragmentFragment
  >;
};

export type GetTrackLessonQueryVariables = Exact<{
  lessonId: Scalars["Int"];
}>;

export type GetTrackLessonQuery = { __typename?: "Query" } & {
  getTrackLesson?: Maybe<
    { __typename?: "TrackingLesson" } & TrackingLessonFragmentFragment
  >;
};

export type InstructorQueryVariables = Exact<{
  instructorId: Scalars["Float"];
}>;

export type InstructorQuery = { __typename?: "Query" } & {
  instructor: { __typename?: "User" } & Pick<
    User,
    "id" | "username" | "avatar"
  > & {
      instructor?: Maybe<
        { __typename?: "Instructor" } & Pick<
          Instructor,
          "id" | "major" | "intro" | "skills"
        >
      >;
    };
};

export type IsOwnQueryVariables = Exact<{
  courseId: Scalars["Int"];
}>;

export type IsOwnQuery = { __typename?: "Query" } & Pick<Query, "isOwn">;

export type LatestLessonQueryVariables = Exact<{ [key: string]: never }>;

export type LatestLessonQuery = { __typename?: "Query" } & {
  latestLesson?: Maybe<
    { __typename?: "Lesson" } & {
      track: Array<
        { __typename?: "TrackingLesson" } & TrackingLessonFragmentFragment
      >;
    } & LessonFragmentFragment
  >;
};

export type LessonQueryVariables = Exact<{
  lessonId: Scalars["Int"];
}>;

export type LessonQuery = { __typename?: "Query" } & {
  lesson?: Maybe<
    { __typename?: "Lesson" } & {
      section: { __typename?: "Section" } & Pick<Section, "id" | "name">;
      resource: Array<
        { __typename?: "Resource" } & Pick<
          Resource,
          "id" | "name" | "url" | "type"
        >
      >;
    } & LessonFragmentFragment
  >;
};

export type LessonsQueryVariables = Exact<{
  sectionId: Scalars["Float"];
}>;

export type LessonsQuery = { __typename?: "Query" } & {
  lessons: Array<{ __typename?: "Lesson" } & LessonFragmentFragment>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & UserFragmentFragment>;
};

export type MyCourseQueryVariables = Exact<{ [key: string]: never }>;

export type MyCourseQuery = { __typename?: "Query" } & {
  myCourse?: Maybe<
    Array<
      { __typename?: "Course" } & {
        category: { __typename?: "Category" } & Pick<
          Category,
          "id" | "name" | "imageUrl"
        >;
      } & CourseFragmentFragment
    >
  >;
};

export type MyFavoriteQueryVariables = Exact<{ [key: string]: never }>;

export type MyFavoriteQuery = { __typename?: "Query" } & {
  myFavorite?: Maybe<
    Array<
      { __typename?: "Course" } & {
        category: { __typename?: "Category" } & Pick<
          Category,
          "id" | "imageUrl" | "name"
        >;
      } & CourseFragmentFragment
    >
  >;
};

export type QuestionsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["DateTime"]>;
  lessonId: Scalars["Int"];
}>;

export type QuestionsQuery = { __typename?: "Query" } & {
  questions: { __typename?: "PaginatedQuestion" } & Pick<
    PaginatedQuestion,
    "hasMore"
  > & {
      questions: Array<{ __typename?: "Question" } & QuestionFragmentFragment>;
    };
};

export type RecommendQueryVariables = Exact<{ [key: string]: never }>;

export type RecommendQuery = { __typename?: "Query" } & {
  recommend: Array<
    { __typename?: "Course" } & {
      category: { __typename?: "Category" } & Pick<
        Category,
        "id" | "name" | "imageUrl"
      >;
      favorite: { __typename?: "Favorite" } & FavoriteFragmentFragment;
    } & CourseFragmentFragment
  >;
};

export type ReplyQuestionsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["DateTime"]>;
  questionId: Scalars["Int"];
}>;

export type ReplyQuestionsQuery = { __typename?: "Query" } & {
  replyQuestions: { __typename?: "PaginatedQuestion" } & Pick<
    PaginatedQuestion,
    "hasMore"
  > & {
      questions: Array<{ __typename?: "Question" } & QuestionFragmentFragment>;
    };
};

export const CategoryFragmentFragmentDoc = gql`
  fragment CategoryFragment on Category {
    id
    imageUrl
    name
  }
`;
export const CourseFragmentFragmentDoc = gql`
  fragment CourseFragment on Course {
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
    imageUrl
    createdAt
  }
`;
export const FavoriteFragmentFragmentDoc = gql`
  fragment FavoriteFragment on Favorite {
    userId
  }
`;
export const LessonFragmentFragmentDoc = gql`
  fragment LessonFragment on Lesson {
    id
    name
    content
    video
    captionName
    times
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
    isActivated
    instructor {
      ...InstructorFragment
    }
  }
  ${InstructorFragmentFragmentDoc}
`;
export const QuestionFragmentFragmentDoc = gql`
  fragment QuestionFragment on Question {
    id
    content
    votedNumber
    repliedNumber
    user {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export const TrackingCourseFragmentFragmentDoc = gql`
  fragment TrackingCourseFragment on TrackingCourse {
    userId
    lessonId
  }
`;
export const TrackingLessonFragmentFragmentDoc = gql`
  fragment TrackingLessonFragment on TrackingLesson {
    userId
    lessonId
    time
  }
`;
export const ErrorFragmentFragmentDoc = gql`
  fragment ErrorFragment on FieldError {
    field
    message
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
export const ActivateAccountDocument = gql`
  mutation ActivateAccount($token: String!) {
    activateAccount(token: $token) {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;

export function useActivateAccountMutation() {
  return Urql.useMutation<
    ActivateAccountMutation,
    ActivateAccountMutationVariables
  >(ActivateAccountDocument);
}
export const AddToMyFavoriteDocument = gql`
  mutation AddToMyFavorite($courseId: Float!) {
    addToMyFavorite(courseId: $courseId)
  }
`;

export function useAddToMyFavoriteMutation() {
  return Urql.useMutation<
    AddToMyFavoriteMutation,
    AddToMyFavoriteMutationVariables
  >(AddToMyFavoriteDocument);
}
export const BecomeOrUpdateInstructorDocument = gql`
  mutation BecomeOrUpdateInstructor($major: String!, $intro: String!) {
    becomeOrUpdateInstructor(major: $major, intro: $intro) {
      ...UserResponseFragment
    }
  }
  ${UserResponseFragmentFragmentDoc}
`;

export function useBecomeOrUpdateInstructorMutation() {
  return Urql.useMutation<
    BecomeOrUpdateInstructorMutation,
    BecomeOrUpdateInstructorMutationVariables
  >(BecomeOrUpdateInstructorDocument);
}
export const ChangeLanguageDocument = gql`
  mutation ChangeLanguage($language: String!) {
    changeLanguage(language: $language)
  }
`;

export function useChangeLanguageMutation() {
  return Urql.useMutation<
    ChangeLanguageMutation,
    ChangeLanguageMutationVariables
  >(ChangeLanguageDocument);
}
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
export const ChangeThemeDocument = gql`
  mutation ChangeTheme($theme: String!) {
    changeTheme(theme: $theme)
  }
`;

export function useChangeThemeMutation() {
  return Urql.useMutation<ChangeThemeMutation, ChangeThemeMutationVariables>(
    ChangeThemeDocument
  );
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!, $token: String!) {
    forgotPassword(email: $email, token: $token)
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
export const PostQuestionDocument = gql`
  mutation PostQuestion($content: String!, $lessonId: Int!) {
    postQuestion(content: $content, lessonId: $lessonId) {
      ...QuestionFragment
    }
  }
  ${QuestionFragmentFragmentDoc}
`;

export function usePostQuestionMutation() {
  return Urql.useMutation<PostQuestionMutation, PostQuestionMutationVariables>(
    PostQuestionDocument
  );
}
export const PostReplyQuestionDocument = gql`
  mutation PostReplyQuestion(
    $content: String!
    $lessonId: Int!
    $repliedQuestionId: Int!
  ) {
    postReplyQuestion(
      content: $content
      lessonId: $lessonId
      repliedQuestionId: $repliedQuestionId
    ) {
      ...QuestionFragment
    }
  }
  ${QuestionFragmentFragmentDoc}
`;

export function usePostReplyQuestionMutation() {
  return Urql.useMutation<
    PostReplyQuestionMutation,
    PostReplyQuestionMutationVariables
  >(PostReplyQuestionDocument);
}
export const PurchaseDocument = gql`
  mutation Purchase($courseId: Float!) {
    purchase(courseId: $courseId) {
      ...CourseFragment
    }
  }
  ${CourseFragmentFragmentDoc}
`;

export function usePurchaseMutation() {
  return Urql.useMutation<PurchaseMutation, PurchaseMutationVariables>(
    PurchaseDocument
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
export const RemoveFromFavoriteDocument = gql`
  mutation RemoveFromFavorite($courseId: Float!) {
    removeFromFavorite(courseId: $courseId)
  }
`;

export function useRemoveFromFavoriteMutation() {
  return Urql.useMutation<
    RemoveFromFavoriteMutation,
    RemoveFromFavoriteMutationVariables
  >(RemoveFromFavoriteDocument);
}
export const RemoveHistoryDocument = gql`
  mutation RemoveHistory($search: String!) {
    removeHistory(search: $search)
  }
`;

export function useRemoveHistoryMutation() {
  return Urql.useMutation<
    RemoveHistoryMutation,
    RemoveHistoryMutationVariables
  >(RemoveHistoryDocument);
}
export const RemoveTrackCourseDocument = gql`
  mutation RemoveTrackCourse($courseId: Int!) {
    removeTrackCourse(courseId: $courseId)
  }
`;

export function useRemoveTrackCourseMutation() {
  return Urql.useMutation<
    RemoveTrackCourseMutation,
    RemoveTrackCourseMutationVariables
  >(RemoveTrackCourseDocument);
}
export const RequestActivateDocument = gql`
  mutation RequestActivate($email: String!, $token: String!) {
    requestActivate(email: $email, token: $token)
  }
`;

export function useRequestActivateMutation() {
  return Urql.useMutation<
    RequestActivateMutation,
    RequestActivateMutationVariables
  >(RequestActivateDocument);
}
export const SaveHistoryDocument = gql`
  mutation SaveHistory($search: String!) {
    saveHistory(search: $search)
  }
`;

export function useSaveHistoryMutation() {
  return Urql.useMutation<SaveHistoryMutation, SaveHistoryMutationVariables>(
    SaveHistoryDocument
  );
}
export const TrackCourseDocument = gql`
  mutation TrackCourse($lessonId: Float!, $courseId: Float!) {
    trackCourse(lessonId: $lessonId, courseId: $courseId) {
      ...TrackingCourseFragment
    }
  }
  ${TrackingCourseFragmentFragmentDoc}
`;

export function useTrackCourseMutation() {
  return Urql.useMutation<TrackCourseMutation, TrackCourseMutationVariables>(
    TrackCourseDocument
  );
}
export const TrackLessonDocument = gql`
  mutation TrackLesson($lessonId: Float!, $time: Float!) {
    trackLesson(lessonId: $lessonId, time: $time) {
      ...TrackingLessonFragment
    }
  }
  ${TrackingLessonFragmentFragmentDoc}
`;

export function useTrackLessonMutation() {
  return Urql.useMutation<TrackLessonMutation, TrackLessonMutationVariables>(
    TrackLessonDocument
  );
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($username: String!, $phone: String!) {
    updateUser(username: $username, phone: $phone)
  }
`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument
  );
}
export const WriteFeedBackDocument = gql`
  mutation WriteFeedBack($courseId: Int!, $rate: Int!, $content: String!) {
    writeFeedBack(rate: $rate, content: $content, courseId: $courseId)
  }
`;

export function useWriteFeedBackMutation() {
  return Urql.useMutation<
    WriteFeedBackMutation,
    WriteFeedBackMutationVariables
  >(WriteFeedBackDocument);
}
export const AssignmentsDocument = gql`
  query Assignments($lessonId: Float!) {
    assignments(lessonId: $lessonId) {
      id
      type
      code
      anwser
      time
      title
      question {
        id
        content
      }
    }
  }
`;

export function useAssignmentsQuery(
  options: Omit<Urql.UseQueryArgs<AssignmentsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<AssignmentsQuery>({
    query: AssignmentsDocument,
    ...options,
  });
}
export const CategoriesDocument = gql`
  query Categories {
    categories {
      id
      imageUrl
      name
    }
  }
`;

export function useCategoriesQuery(
  options: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<CategoriesQuery>({
    query: CategoriesDocument,
    ...options,
  });
}
export const CourseDocument = gql`
  query Course($id: Int!) {
    course(id: $id) {
      ...CourseFragment
      section {
        id
        name
      }
    }
  }
  ${CourseFragmentFragmentDoc}
`;

export function useCourseQuery(
  options: Omit<Urql.UseQueryArgs<CourseQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<CourseQuery>({ query: CourseDocument, ...options });
}
export const CoursesDocument = gql`
  query Courses(
    $limit: Int!
    $cursor: DateTime
    $categoryId: Float
    $isAsc: Boolean
    $orderType: String
    $search: String
  ) {
    courses(
      limit: $limit
      cursor: $cursor
      categoryId: $categoryId
      isAsc: $isAsc
      orderType: $orderType
      search: $search
    ) {
      courses {
        ...CourseFragment
        category {
          id
          imageUrl
          name
        }
        favorite {
          ...FavoriteFragment
        }
      }
      hasMore
    }
  }
  ${CourseFragmentFragmentDoc}
  ${FavoriteFragmentFragmentDoc}
`;

export function useCoursesQuery(
  options: Omit<Urql.UseQueryArgs<CoursesQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<CoursesQuery>({ query: CoursesDocument, ...options });
}
export const CoursesPresentDocument = gql`
  query CoursesPresent(
    $limit: Int!
    $categoryId: Float
    $isAsc: Boolean
    $orderType: String
    $search: String
  ) {
    coursesPresent(
      limit: $limit
      categoryId: $categoryId
      isAsc: $isAsc
      orderType: $orderType
      search: $search
    ) {
      courses {
        ...CourseFragment
        category {
          id
          imageUrl
          name
        }
        favorite {
          ...FavoriteFragment
        }
      }
      hasMore
    }
  }
  ${CourseFragmentFragmentDoc}
  ${FavoriteFragmentFragmentDoc}
`;

export function useCoursesPresentQuery(
  options: Omit<Urql.UseQueryArgs<CoursesPresentQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<CoursesPresentQuery>({
    query: CoursesPresentDocument,
    ...options,
  });
}
export const FeedBacksDocument = gql`
  query FeedBacks($limit: Int!, $cursor: DateTime, $courseId: Float!) {
    feedBacks(limit: $limit, cursor: $cursor, courseId: $courseId) {
      feedBacks {
        id
        rate
        subject
        content
        userId
        createdAt
        user {
          id
          username
          avatar
        }
      }
      hasMore
    }
  }
`;

export function useFeedBacksQuery(
  options: Omit<Urql.UseQueryArgs<FeedBacksQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<FeedBacksQuery>({
    query: FeedBacksDocument,
    ...options,
  });
}
export const GetHistoryDocument = gql`
  query GetHistory {
    getHistory
  }
`;

export function useGetHistoryQuery(
  options: Omit<Urql.UseQueryArgs<GetHistoryQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetHistoryQuery>({
    query: GetHistoryDocument,
    ...options,
  });
}
export const GetLanguageDocument = gql`
  query GetLanguage {
    getLanguage
  }
`;

export function useGetLanguageQuery(
  options: Omit<Urql.UseQueryArgs<GetLanguageQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetLanguageQuery>({
    query: GetLanguageDocument,
    ...options,
  });
}
export const GetThemeDocument = gql`
  query GetTheme {
    getTheme
  }
`;

export function useGetThemeQuery(
  options: Omit<Urql.UseQueryArgs<GetThemeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetThemeQuery>({ query: GetThemeDocument, ...options });
}
export const GetTrackCourseDocument = gql`
  query GetTrackCourse($courseId: Int!) {
    getTrackCourse(courseId: $courseId) {
      ...TrackingCourseFragment
    }
  }
  ${TrackingCourseFragmentFragmentDoc}
`;

export function useGetTrackCourseQuery(
  options: Omit<Urql.UseQueryArgs<GetTrackCourseQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetTrackCourseQuery>({
    query: GetTrackCourseDocument,
    ...options,
  });
}
export const GetTrackLessonDocument = gql`
  query GetTrackLesson($lessonId: Int!) {
    getTrackLesson(lessonId: $lessonId) {
      ...TrackingLessonFragment
    }
  }
  ${TrackingLessonFragmentFragmentDoc}
`;

export function useGetTrackLessonQuery(
  options: Omit<Urql.UseQueryArgs<GetTrackLessonQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetTrackLessonQuery>({
    query: GetTrackLessonDocument,
    ...options,
  });
}
export const InstructorDocument = gql`
  query Instructor($instructorId: Float!) {
    instructor(instructorId: $instructorId) {
      id
      username
      avatar
      instructor {
        id
        major
        intro
        skills
      }
    }
  }
`;

export function useInstructorQuery(
  options: Omit<Urql.UseQueryArgs<InstructorQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<InstructorQuery>({
    query: InstructorDocument,
    ...options,
  });
}
export const IsOwnDocument = gql`
  query IsOwn($courseId: Int!) {
    isOwn(courseId: $courseId)
  }
`;

export function useIsOwnQuery(
  options: Omit<Urql.UseQueryArgs<IsOwnQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<IsOwnQuery>({ query: IsOwnDocument, ...options });
}
export const LatestLessonDocument = gql`
  query LatestLesson {
    latestLesson {
      ...LessonFragment
      track {
        ...TrackingLessonFragment
      }
    }
  }
  ${LessonFragmentFragmentDoc}
  ${TrackingLessonFragmentFragmentDoc}
`;

export function useLatestLessonQuery(
  options: Omit<Urql.UseQueryArgs<LatestLessonQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<LatestLessonQuery>({
    query: LatestLessonDocument,
    ...options,
  });
}
export const LessonDocument = gql`
  query Lesson($lessonId: Int!) {
    lesson(lessonId: $lessonId) {
      ...LessonFragment
      section {
        id
        name
      }
      resource {
        id
        name
        url
        type
      }
    }
  }
  ${LessonFragmentFragmentDoc}
`;

export function useLessonQuery(
  options: Omit<Urql.UseQueryArgs<LessonQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<LessonQuery>({ query: LessonDocument, ...options });
}
export const LessonsDocument = gql`
  query Lessons($sectionId: Float!) {
    lessons(sectionId: $sectionId) {
      ...LessonFragment
    }
  }
  ${LessonFragmentFragmentDoc}
`;

export function useLessonsQuery(
  options: Omit<Urql.UseQueryArgs<LessonsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<LessonsQuery>({ query: LessonsDocument, ...options });
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
export const MyCourseDocument = gql`
  query MyCourse {
    myCourse {
      ...CourseFragment
      category {
        id
        name
        imageUrl
      }
    }
  }
  ${CourseFragmentFragmentDoc}
`;

export function useMyCourseQuery(
  options: Omit<Urql.UseQueryArgs<MyCourseQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MyCourseQuery>({ query: MyCourseDocument, ...options });
}
export const MyFavoriteDocument = gql`
  query MyFavorite {
    myFavorite {
      ...CourseFragment
      category {
        id
        imageUrl
        name
      }
    }
  }
  ${CourseFragmentFragmentDoc}
`;

export function useMyFavoriteQuery(
  options: Omit<Urql.UseQueryArgs<MyFavoriteQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MyFavoriteQuery>({
    query: MyFavoriteDocument,
    ...options,
  });
}
export const QuestionsDocument = gql`
  query Questions($limit: Int!, $cursor: DateTime, $lessonId: Int!) {
    questions(limit: $limit, cursor: $cursor, lessonId: $lessonId) {
      questions {
        ...QuestionFragment
      }
      hasMore
    }
  }
  ${QuestionFragmentFragmentDoc}
`;

export function useQuestionsQuery(
  options: Omit<Urql.UseQueryArgs<QuestionsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<QuestionsQuery>({
    query: QuestionsDocument,
    ...options,
  });
}
export const RecommendDocument = gql`
  query Recommend {
    recommend {
      ...CourseFragment
      category {
        id
        name
        imageUrl
      }
      favorite {
        ...FavoriteFragment
      }
    }
  }
  ${CourseFragmentFragmentDoc}
  ${FavoriteFragmentFragmentDoc}
`;

export function useRecommendQuery(
  options: Omit<Urql.UseQueryArgs<RecommendQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<RecommendQuery>({
    query: RecommendDocument,
    ...options,
  });
}
export const ReplyQuestionsDocument = gql`
  query ReplyQuestions($limit: Int!, $cursor: DateTime, $questionId: Int!) {
    replyQuestions(limit: $limit, cursor: $cursor, questionId: $questionId) {
      hasMore
      questions {
        ...QuestionFragment
      }
    }
  }
  ${QuestionFragmentFragmentDoc}
`;

export function useReplyQuestionsQuery(
  options: Omit<Urql.UseQueryArgs<ReplyQuestionsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<ReplyQuestionsQuery>({
    query: ReplyQuestionsDocument,
    ...options,
  });
}
