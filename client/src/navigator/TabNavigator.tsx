import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import styled from "styled-components";
import CoursesScreen from "../screens/CoursesScreen";
import HomeScreen from "../screens/HomeScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import { AppParamList } from "../utils/params";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator";
import { useSelector } from "react-redux";
import { ReduxReducers } from "../../types";
interface TabsNavigatorProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const TabsNavigator: React.FC<TabsNavigatorProps> = ({}) => {
  const tabBarVisible: Boolean = useSelector(
    (state: ReduxReducers) => state!.tabBarVisible
  );

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "project";
          switch (route.name) {
            case "HomeTab":
              iconName = "home";
              return <Feather name={iconName} size={size} color={color} />;
            case "Courses":
              iconName = "graduation-cap";
              return <Entypo name={iconName} size={size} color={color} />;
            //   setTabBarVisible(false);
            //   iconName = "home";
            //   return <Feather name={iconName} size={size} color={color} />;
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
      <Tabs.Screen name="Courses" component={CoursesScreen} />
      <Tabs.Screen name="Projects" component={ProjectsScreen} />
    </Tabs.Navigator>
  );
};
