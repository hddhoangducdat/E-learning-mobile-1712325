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
import { timeCalc } from "../utils/timeCalc";
import { AssignmentQuestion } from "../generated/graphql";
// import { LinearGradient } from "expo-linear-gradient";

interface ProjectProps {
  image: ImageSourcePropType;
  title?: string;
  code?: string;
  time?: number;
  type?: string;
  question?:
    | ({
        __typename?: "AssignmentQuestion" | undefined;
      } & Pick<AssignmentQuestion, "id" | "content">)[]
    | null
    | undefined;
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const tabBarHeight = 40;

const Assignment: React.FC<ProjectProps> = ({
  time,
  title,
  image,
  type,
  code,
  question,
}) => {
  const cardWidth = useRef(new Animated.Value(315)).current;
  const cardHeight = useRef(new Animated.Value(190)).current;

  return (
    <AnimatedContainer
      style={{
        width: 315,
        height: 190,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <Cover>
        <Image source={image} />

        <View>
          <Title>{title}</Title>
          <Code>{type}</Code>
        </View>

        <Author>TIme: {timeCalc(time)}</Author>
      </Cover>
      {/* <Text>{code}</Text> */}
    </AnimatedContainer>
  );
};

export default Assignment;

const View = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Code = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #c5c5c5;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  width: 315px;
  height: 190px;
  border-radius: 14px;
  /* background-color: white; */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 190px;
  border-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
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
