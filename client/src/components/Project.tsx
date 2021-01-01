import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { TRIGGER_PROJECT_CARD } from "../../types";
// import { LinearGradient } from "expo-linear-gradient";

interface ProjectProps {
  image: ImageSourcePropType;
  title: string;
  author: string;
  text: string;
  canOpen?: Boolean;
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabBarHeight = 40;

const Project: React.FC<ProjectProps> = ({
  author,
  text,
  title,
  image,
  canOpen,
}) => {
  const cardWidth = useRef(new Animated.Value(315)).current;
  const cardHeight = useRef(new Animated.Value(460)).current;
  const titleTop = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const textHeight = useRef(new Animated.Value(100)).current;

  const dispatch = useDispatch();

  const openCard = () => {
    if (!canOpen) return;

    dispatch({ type: TRIGGER_PROJECT_CARD, payload: true });
    Animated.spring(cardWidth, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start();

    Animated.spring(cardHeight, {
      toValue: screenHeight - tabBarHeight,
      useNativeDriver: false,
    }).start();

    Animated.spring(titleTop, { toValue: 40, useNativeDriver: false }).start();

    Animated.timing(opacity, { toValue: 1, useNativeDriver: false }).start();

    Animated.spring(textHeight, {
      toValue: 1000,
      useNativeDriver: false,
    }).start();

    StatusBar.setHidden(true);
  };

  const closeCard = () => {
    dispatch({ type: TRIGGER_PROJECT_CARD, payload: false });
    Animated.spring(cardWidth, {
      toValue: 315,
      useNativeDriver: false,
    }).start();
    Animated.spring(cardHeight, {
      toValue: 460,
      useNativeDriver: false,
    }).start();
    Animated.spring(titleTop, { toValue: 20, useNativeDriver: false }).start();

    Animated.timing(opacity, { toValue: 0, useNativeDriver: false }).start();

    Animated.spring(textHeight, {
      toValue: 100,
      useNativeDriver: false,
    }).start();

    StatusBar.setHidden(false);
  };

  return (
    <AnimatedContainer
      style={{
        width: cardWidth,
        height: cardHeight,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <Cover>
        <TouchableWithoutFeedback onPress={openCard}>
          <Image source={image} />
        </TouchableWithoutFeedback>

        <AnimatedTitle style={{ top: titleTop }}>{title}</AnimatedTitle>

        <Author>by {author}</Author>
      </Cover>
      <AnimatedText style={{ height: textHeight }}>{text}</AnimatedText>
      {/* <AnimatedLinearGradient
        colors={["rgba(255,255,255, 0)", "rgba(255,255,255, 1)"]}
        style={{
          position: "absolute",
          top: 330,
          width: "100%",
          height: textHeight,
        }}
      /> */}
      <TouchableOpacity
        onPress={closeCard}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <AnimatedCloseView style={{ opacity }}>
          <AntDesign name="close" size={22} color="#5463fb" />
        </AnimatedCloseView>
      </TouchableOpacity>
    </AnimatedContainer>
  );
};

export default Project;

// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;

const AnimatedText = Animated.createAnimatedComponent(Text);
