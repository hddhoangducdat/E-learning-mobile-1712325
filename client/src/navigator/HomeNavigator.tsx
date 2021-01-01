import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import { AppBottomTabProps, HomeParamList } from "../utils/params";
import LessonScreen from "../screens/LessonScreen";

const Stack = createStackNavigator<HomeParamList>();

const HomeNavigator = ({ navigation }: AppBottomTabProps<"HomeTab">) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Section"
        component={SectionScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
