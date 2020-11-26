import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import { AppBottomTabProps, HomeParamList } from "../utils/params";

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
    </Stack.Navigator>
  );
};

export default HomeNavigator;
