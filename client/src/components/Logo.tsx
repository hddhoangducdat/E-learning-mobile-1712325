import React from "react";
import styled from "styled-components/native";
import { useGetThemeQuery } from "../generated/graphql";
import { themeModify } from "../utils/themeModify";

const Logo = (props: any) => {
  const [theme] = useGetThemeQuery();
  return (
    <Container
      style={{
        shadowColor: themeModify("#000", theme.data?.getTheme),
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: themeModify("#ffff", theme.data?.getTheme),
      }}
    >
      <Image source={{ uri: props.image }} resizeMode="contain" />
      <Text style={{ color: themeModify("#000", theme.data?.getTheme) }}>
        {props.text}
      </Text>
    </Container>
  );
};

const Container = styled.View`
  padding: 12px 16px 12px;
  height: 60px;
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
