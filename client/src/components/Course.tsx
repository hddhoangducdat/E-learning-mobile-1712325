import React, { useEffect, useState } from "react";
import { Dimensions, ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import { getCourseWidth } from "../utils/getCourseWidth";

const screenWidth = Dimensions.get("window").width;

interface CourseProps {
  image: ImageSourcePropType;
  logo: ImageSourcePropType;
  subtitle: string;
  title: string;
  avatar: ImageSourcePropType;
  caption: string;
  author: string;
}

const Course = ({
  author,
  avatar,
  image,
  caption,
  logo,
  subtitle,
  title,
}: CourseProps) => {
  const [cardWidth, setCardWidth] = useState(getCourseWidth(screenWidth));

  useEffect(() => {
    Dimensions.addEventListener("change", (dimensions) => {
      setCardWidth(getCourseWidth(dimensions.window.width));
    });
  });

  return (
    <Container
      style={{
        width: cardWidth,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
      }}
    >
      <Cover>
        <Image source={image} />
        <Logo source={logo} resizeMode="contain" />
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
      </Cover>
      <Content>
        <Avatar source={avatar} />
        <Caption>{caption}</Caption>
        <Author>Taught by {author}</Author>
      </Content>
    </Container>
  );
};

const Content = styled.View`
  padding-left: 62px;
  justify-content: center;
  height: 75px;
`;

const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
  border-radius: 16px;
`;

const Caption = styled.Text`
  font-size: 14px;
  color: #3c4560;
  font-weight: 500;
  max-width: 260px;
`;

const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;

const Container = styled.View`
  width: 335px;
  height: 335px;
  border-radius: 14px;
  background: white;
  margin: 15px 20px;
`;

const Cover = styled.View`
  height: 260px;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  width: 170px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 20px;
`;

export default Course;
