import React from "react";
import styled, { DefaultTheme } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRate } from "../utils/useRate";
import { useGetThemeQuery } from "../generated/graphql";
import { themeModify } from "../utils/themeModify";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SearchCourse({
  logo,
  image,
  subtitle,
  caption,
  rate,
  participant,
  isBestSeller,
  price,
  category,
  navigation,
}: any) {
  const [color] = useGetThemeQuery();
  const theme: DefaultTheme = {
    text: {
      color: themeModify("#5d5d5d", color.data?.getTheme),
    },
    caption: {
      color: themeModify("#3c4560", color.data?.getTheme),
    },
  };

  return (
    <>
      {/* <Seperate /> */}
      <Container>
        <Content>
          <Logo
            source={{
              uri: image,
            }}
          />
          <Wrapper>
            <Caption style={{ width: 230 }} theme={theme}>
              {caption}
            </Caption>
            <Subtitle>{subtitle}</Subtitle>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {useRate(rate / 2)}
              <Text theme={theme} style={{ marginLeft: 5, marginRight: 5 }}>
                {rate / 2}
              </Text>
              <Text theme={theme}>{"(" + participant + ") "}</Text>
            </View>
            <Text theme={theme}>{category}</Text>
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

const Text = styled.Text`
  color: ${(props: any) => props.theme.text.color};
`;

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
  color: ${(props: any) => props.theme.caption.color};
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
  width: 100%;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;
