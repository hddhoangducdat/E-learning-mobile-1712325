import * as React from "react";
import {
  NavigationContainer,
  // DefaultTheme,
  // DarkTheme,
} from "@react-navigation/native";
import { TabsNavigator } from "./TabNavigator";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = ({}) => {
  return (
    <NavigationContainer
    // linking={LinkingConfiguration}
    // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {/* <RootNavigator /> */}
      <TabsNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
