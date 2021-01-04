import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import CoursesScreen from "../screens/CoursesScreen";
import SearchScreen from "../screens/SearchScreen";
import { AppParamList } from "../utils/params";
import HomeNavigator from "./HomeNavigator";
import { useSelector } from "react-redux";
import { ReduxReducers } from "../../types";
import { loadAsync } from "expo-font";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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
          switch (route.name) {
            case "Home":
              return <FontAwesome5 name="home" size={20} color={color} />;
            case "Courses":
              return (
                <MaterialIcons name="local-library" size={24} color={color} />
              );
            default:
              return <FontAwesome name="search" size={20} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4775f2",
        inactiveTintColor: "#b8bece",
        style: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 7,
        },
      }}
    >
      <Tabs.Screen
        options={{ tabBarVisible: tabBarVisible ? true : false }}
        name="Home"
        component={HomeNavigator}
      />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="Courses" component={CoursesScreen} />
    </Tabs.Navigator>
  );
};
