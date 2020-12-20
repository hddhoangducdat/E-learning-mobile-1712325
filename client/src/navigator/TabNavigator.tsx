import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import CoursesScreen from "../screens/CoursesScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProjectsScreen from "../screens/ProjectsScreen";
import { AppParamList } from "../utils/params";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator";
import { useSelector } from "react-redux";
import { ReduxReducers } from "../../types";
import { loadAsync } from "expo-font";
import { useEffect } from "react";
import styled from "styled-components/native";
import Svg, { Path, Text } from "react-native-svg";

interface TabsNavigatorProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const TabsNavigator: React.FC<TabsNavigatorProps> = ({}) => {
  const tabBarVisible: Boolean = useSelector(
    (state: ReduxReducers) => state!.tabBarVisible
  );

  useEffect(() => {
    (async () => {
      await loadAsync({
        // Ionicons: require("ionicons"),
      });
    })();
  });

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "project";
          switch (route.name) {
            case "HomeTab":
              iconName = "home";
              return (
                <MaterialCommunityIcons
                  name="home-variant-outline"
                  size={size}
                  color={color}
                />
              );
            case "Courses":
              iconName = "graduation-cap";

              return <Entypo name={iconName} size={size} color={color} />;
            // setTabBarVisible(false);
            // iconName = "home";
            // return <Feather name={iconName} size={size} color={color} />;
            default:
              return <Octicons name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4775f2",
        inactiveTintColor: "#b8bece",
      }}
    >
      <Tabs.Screen
        options={{ tabBarVisible: tabBarVisible ? true : false }}
        name="HomeTab"
        component={HomeNavigator}
      />
      <Tabs.Screen name="Projects" component={ProjectsScreen} />

      <Tabs.Screen name="Courses" component={CoursesScreen} />
    </Tabs.Navigator>
  );
};
