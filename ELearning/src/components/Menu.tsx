import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import { Icon } from "expo";

const screenHeight = Dimensions.get("window").height;

const Menu = () => {
  const [top] = useState(new Animated.Value(screenHeight));

  // useEffect(() => {
  //   Animated.spring(top, {
  //     toValue: 0,
  //   }).start();
  // });

  // const toggleMenu = () => {
  //   Animated.spring(top, {
  //     toValue: screenHeight,
  //   }: useNativeDriver).start();
  // };

  return (
    <Container style={{ top }}>
      <Cover />
      <TouchableOpacity
      // onPress={toggleMenu}
      >
        <CloseView>
          <Icon name="ios-close" size={44} colors="#546bfb" />
        </CloseView>
      </TouchableOpacity>
      <Content />
    </Container>
  );
};

export default Menu;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

// const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
`;

const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
`;
