import React from "react";
import styled from "styled-components/native";
// import { LinearGradient } from "expo";
import { ImageSourcePropType } from "react-native";

interface CourseSectionProps {
  image: string;
  title: string;
  id: number;
}

const CourseSection = ({ id, image, title }: CourseSectionProps) => (
  <Container>
    <Mask>
      <Image source={{ uri: image }} />
      {/* <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      <LinearGradient
        colors={["#3399ff", "#33e1ff"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{
          position: "absolute",
          bottom: 0,
          height: 4,
          borderRadius: 2,
          width: progress * 100 + "%",
        }}
      /> */}
      <Border />
    </Mask>
    <Text>{title}</Text>
  </Container>
);

export default CourseSection;

const Container = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Mask = styled.View`
  height: 100%;
  border-radius: 10px;
  background: #3c4560;
  overflow: hidden;
  justify-content: flex-end;
  margin-left: 20px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Text = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: black;
  margin: 16px;
`;

const Border = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`;
