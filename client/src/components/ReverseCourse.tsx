import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { themeModify } from "../utils/themeModify";
import { useGetThemeQuery } from "../generated/graphql";

export default function ReverseCourse({
  logo,
  image,
  subtitle,
  caption,
  rate,
  participant,
  isBestSeller,
  price,
}: any) {
  const [theme] = useGetThemeQuery();
  return (
    <Container>
      <Content>
        <Wrapper>
          <Caption>{caption.slice(0, 23)}</Caption>
          <Subtitle>{subtitle}</Subtitle>
          <RateContainer>
            {rate / 2 <= 1 ? (
              <FontAwesome name="star-o" size={15} color="#f2b20f" />
            ) : rate / 2 <= 3 ? (
              <FontAwesome name="star-half-empty" size={15} color="#f2b20f" />
            ) : (
              <FontAwesome name="star" size={15} color="#f2b20f" />
            )}

            <Rate style={{ color: themeModify("#000", theme.data?.getTheme) }}>
              {rate / 2}
            </Rate>
            <Text style={{ color: themeModify("#000", theme.data?.getTheme) }}>
              {"(" + participant}
            </Text>
            <FontAwesome name="user-o" size={10} color="black" />
            <Text style={{ color: themeModify("#000", theme.data?.getTheme) }}>
              {")"}
            </Text>
            <RightText
              style={{ color: themeModify("#000", theme.data?.getTheme) }}
            >
              {price}
            </RightText>
          </RateContainer>
        </Wrapper>
        <Logo
          source={{
            uri: image,
          }}
        />
      </Content>
    </Container>
  );
}

const RightText = styled.Text`
  margin-left: 60px;
`;

const Text = styled.Text`
  margin-right: 2px;
`;

const RateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Rate = styled.Text`
  font-size: 15px;
  color: #000;
  margin: 0 5px;
`;

const Content = styled.View`
  /* margin-top: 3px; */
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const Wrapper = styled.View``;

const Logo = styled.Image`
  position: absolute;
  border-radius: 5px;
  right: 0;
  width: 64px;
  height: 64px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  margin-top: 4px;
`;

const Container = styled.View`
  position: relative;
  width: 339px;
  height: 80px;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  /* margin-left: 20px; */
  /* margin-right: 20px; */
  margin-top: 20px;
`;
