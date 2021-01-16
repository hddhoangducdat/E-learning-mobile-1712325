import React, { useEffect, useState } from "react";
import styled, { DefaultTheme } from "styled-components/native";
// import { LinearGradient } from "expo";
import CourseSection from "../components/CourseSection";
import Courses from "../components/Favorites";
import { AsyncStorage, Dimensions } from "react-native";
import { Video } from "expo-av";
import {
  useMeQuery,
  useMyCourseQuery,
  useMyFavoriteQuery,
} from "../generated/graphql";
import Favorites from "../components/Favorites";

interface CoursesScreenProps {}

const FavoriteScreen = ({}) => {
  const [me] = useMeQuery();

  if (!me.data?.me) return null;

  const theme: DefaultTheme = {
    container: {
      background: "#f0f5ff",
    },
    text: {
      title: "#050505",
    },
  };

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
