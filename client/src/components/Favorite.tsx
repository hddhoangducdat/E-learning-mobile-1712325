import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Dimensions, ImageSourcePropType } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";
import { getCourseWidth } from "../utils/getCourseWidth";
import { themeModify } from "../utils/themeModify";
import { useGetThemeQuery } from "../generated/graphql";
import { useRate } from "../utils/useRate";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

interface CourseProps {
  id: number;
  image: string;
  logo: string;
  subtitle: string;
  title: string;
  rate: number;
  student: number;
}

const Favorite = ({
  student,
  id,
  image,
  rate,
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

  const [themeColor] = useGetThemeQuery();

  const theme: DefaultTheme = {
    close: {
      background: themeModify("#fff", themeColor.data?.getTheme),
    },
    rate: themeModify("#000", themeColor.data?.getTheme),
    container: themeModify("#ffff", themeColor.data?.getTheme),
    subtitle: themeModify("#818181", themeColor.data?.getTheme),
  };

  return (
    <Container
      theme={theme}
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
      <CloseContainer
        theme={theme}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}
        onPress={() => {}}
      >
        <Ionicons
          name="ios-close"
          size={24}
          color={themeModify("#000", themeColor.data?.getTheme)}
        />
      </CloseContainer>
      <Image source={{ uri: image }} />
      <Logo
        source={{
          uri: logo,
        }}
      />
      <Cover>
        <Title theme={theme}>{title}</Title>
        <Subtitle theme={theme}>{subtitle}</Subtitle>
        <RateContainer>
          <Rate theme={theme}>{rate / 2}</Rate>
          {useRate(10 / 2)}
        </RateContainer>
        <RateContainer>
          <FontAwesome
            name="user-o"
            size={10}
            color={themeModify("#000", themeColor.data?.getTheme)}
          />
          <Text
            style={{
              marginLeft: 5,
              color: themeModify("#000", themeColor.data?.getTheme),
            }}
          >
            {student}
          </Text>
        </RateContainer>
      </Cover>
    </Container>
  );
};

const CloseContainer = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.close.background};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(10px, -10px);
`;

const Text = styled.Text`
  margin-right: 2px;
`;

const RateContainer = styled.View`
  margin-left: 23px;
  flex-direction: row;
  align-items: center;
`;

const Rate = styled.Text`
  font-size: 15px;
  color: ${(props: any) => props.theme.rate};
  margin-right: 5px;
`;

const Container = styled.View`
  width: 335px;
  border-radius: 14px;
  background: ${(props: any) => props.theme.container};
  margin: 15px 20px;
  margin-bottom: 40px;
  padding: 20px 10px;
`;

const Cover = styled.View`
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

const Image = styled.Image`
  position: absolute;
  border-radius: 60px;
  width: 120px;
  height: 120px;
  bottom: 0;
  right: 0;
  transform: translate(15px, 30px);
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 20px;
  right: 20px;
  margin-left: -24px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${(props: any) => props.theme.rate};
  font-weight: 600;
  margin-top: 4px;
  width: 170px;
  margin-left: 20px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: ${(props: any) => props.theme.subtitle};
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 20px;
  margin-bottom: 10px;
`;

export default Favorite;
