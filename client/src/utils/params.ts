import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AppParamList = {
  HomeTab: undefined;
  Courses: undefined;
  Projects: undefined;
};

export type AppBottomTabProps<T extends keyof AppParamList> = {
  navigation: StackNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};

export type HomeParamList = {
  Section: undefined;
  Home: undefined;
  Lesson: undefined;
};

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
