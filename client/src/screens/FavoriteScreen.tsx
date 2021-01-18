import React from "react";
import styled, { DefaultTheme } from "styled-components/native";
import { useMeQuery } from "../generated/graphql";
import Favorites from "../components/Favorites";
import LottieView from "lottie-react-native";

const FavoriteScreen = ({}) => {
  const [me] = useMeQuery();

  const theme: DefaultTheme = {
    container: {
      background: "#f0f5ff",
    },
    text: {
      title: "#050505",
    },
  };

  if (!me.data?.me)
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          style={{
            width: 350,
            height: 350,
          }}
          autoPlay
          loop
          source={require("../assets/json/4432-face-scanning.json")}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        <Title theme={theme} style={{ width: 200 }}>
          You haven't logged in yet
        </Title>
      </View>
    );

  return (
    <Container theme={theme}>
      <ScrollView>
        <Title theme={theme} style={{ marginTop: 50 }}>
          Favorites
        </Title>

        <Favorites />
      </ScrollView>
    </Container>
  );
};

export default FavoriteScreen;

const View = styled.View``;

const Container = styled.View`
  background: ${(props: any) => props.theme.container.background};
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 32px;
  color: ${(props: any) => props.theme.text.title};
  font-weight: 700;
  margin-top: 4px;
  margin-left: 20px;
  width: 220px;
`;
