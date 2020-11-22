import * as React from "react";
import SectionScreen from "../screens/SectionScreen";
import HomeScreen from "../screens/HomeScreen";
import {
  NavigationContainer,
  // DefaultTheme,
  // DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Section" component={SectionScreen} />
    </Stack.Navigator>
  );
};
