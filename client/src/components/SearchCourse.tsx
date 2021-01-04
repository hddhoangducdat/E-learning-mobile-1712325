import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRate } from "../utils/useRate";

export default function SearchCourse({
  logo,
  image,
  subtitle,
  caption,
  rate,
  participant,
  isBestSeller,
  price,
}: any) {
  return (
    <>
      <Seperate />
      <Container>
        <Content>
          <Logo
            source={{
              uri: image,
            }}
          />
          <Wrapper>
            <Caption>{caption}</Caption>
            <Subtitle>{subtitle}</Subtitle>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {useRate(rate / 2)}
              <Text style={{ marginLeft: 5, marginRight: 5 }}>{rate / 2}</Text>
              <Text>{"(" + participant + ")"}</Text>
            </View>
            <Price>{price}</Price>
          </Wrapper>
        </Content>
      </Container>
    </>
  );
}

const Seperate = styled.View`
  background-color: #c3c3c3;
  height: 0.5px;
`;

const Price = styled.Text`
  color: #ff0000;
  font-size: 16px;
`;

const Text = styled.Text``;

const View = styled.View``;

const Content = styled.View`
  /* margin-top: 3px; */
  padding: 20px;
  flex-direction: row;
`;

const Wrapper = styled.View``;

const Logo = styled.Image`
  border-radius: 5px;
  margin-top: 5px;
  margin-right: 10px;
  width: 70px;
  height: 70px;
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
  width: 300px;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;
