import React from "react";
import styled from "styled-components/native";

const Logo = (props: any) => (
  <Container
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
    }}
  >
    <Image source={{ uri: props.image }} resizeMode="contain" />
    <Text>{props.text}</Text>
  </Container>
);

const Container = styled.View`
  padding: 12px 16px 12px;
  height: 60px;
  background: white;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  margin: 0 8px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
`;

export default Logo;
