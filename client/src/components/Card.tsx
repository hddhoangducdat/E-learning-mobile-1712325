import React from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

export default function Card({
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
    <Container
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
    >
      {isBestSeller ? (
        <BestSeller source={require("../assets/images/best_seller.png")} />
      ) : null}

      <Cover>
        <Image source={{ uri: image }} resizeMode="cover" />
      </Cover>
      <Content>
        <Logo
          source={{
            uri: logo,
          }}
        />
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

            <Rate>{rate / 2}</Rate>
            <Text>{"(" + participant}</Text>
            <FontAwesome name="user-o" size={10} color="black" />
            <Text>{")"}</Text>
            <RightText>{price}</RightText>
          </RateContainer>
        </Wrapper>
      </Content>
    </Container>
  );
}

const RightText = styled.Text`
  margin-left: 60px;
`;

const BestSeller = styled.Image`
  transform: translate(12px, -12px);
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 1000;
  right: 0;
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
  margin-top: 3px;
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;

const Logo = styled.Image`
  margin-right: 8px;
  width: 44px;
  height: 44px;
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
  background-color: white;
  width: 315px;
  height: 290px;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;

const Cover = styled.View`
  background-color: #423d3d;
  align-items: center;
  width: 100%;
  height: 200px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  width: 170px;
  margin-top: 20px;
  margin-left: 20px;
`;
