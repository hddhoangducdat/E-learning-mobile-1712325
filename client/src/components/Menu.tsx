import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { ReduxReducers, TRIGGER_MENU, TRIGGER_TAB_BAR } from "../../types";
import { MeQuery, useLogoutMutation } from "../generated/graphql";

const screenHeight = Dimensions.get("window").height;

interface MenuProps {
  me: MeQuery;
}

const Menu = ({ me }: MenuProps) => {
  const top = useRef(new Animated.Value(screenHeight)).current;
  const { openMenu } = useSelector((state: ReduxReducers) => state);
  const dispatch = useDispatch();
  const [, logout] = useLogoutMutation();

  useEffect(() => {
    toggleMenu();
  });

  const toggleMenu = () => {
    if (me?.me) {
      if (openMenu) {
        Animated.spring(top, {
          toValue: 54,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(top, {
          toValue: screenHeight,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  return (
    <AnimatedContainer style={{ top }}>
      <Cover>
        <Image source={require("../assets/images/background2.jpg")} />
        <Title>{me?.me?.username}</Title>
        <Subtitle>{me?.me?.email}</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={() => dispatch({ type: TRIGGER_MENU })}
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          marginLeft: -22,
          zIndex: 1,
        }}
      >
        <CloseView>
          <AntDesign name="close" size={22} color="#5463fb" />
        </CloseView>
      </TouchableOpacity>
      <Content>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              dispatch({ type: TRIGGER_MENU });
              logout();
            }}
          >
            <MenuItem icon={item.icon} title={item.title} text={item.text} />
          </TouchableOpacity>
        ))}
      </Content>
    </AnimatedContainer>
  );
};

export default Menu;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;

const items = [
  {
    icon: "ios-cog",
    title: "Account",
    text: "settings",
  },
  {
    icon: "ios-card",
    title: "Billing",
    text: "payments",
  },
  { icon: "ios-compass", title: "Learn React", text: "start course" },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!",
  },
];
