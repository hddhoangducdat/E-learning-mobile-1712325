import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useMyFavoriteQuery } from "../generated/graphql";
import { AppParamList } from "../utils/params";
import Favorite from "./Favorite";

interface FavoritesProps {
  navigation: StackNavigationProp<AppParamList, "Favorite">;
}

const Favorites = ({ navigation }: FavoritesProps) => {
  const [{ data }] = useMyFavoriteQuery();

  return (
    <Container>
      {data?.myFavorite
        ? data?.myFavorite.map((course, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("Section", {
                  courseId: course.id,
                  categoryUrl: course.category.imageUrl,
                  categoryId: course.category.id,
                  categoryName: course.category.name,
                  isBestSeller: false,
                } as any);
              }}
            >
              <Favorite
                id={course.id}
                logo={course.category.imageUrl}
                image={course.imageUrl}
                title={course.title}
                subtitle={course.subtitle}
                rate={course.rateNumber}
                student={course.soldNumber}
              />
            </TouchableOpacity>
          ))
        : null}
    </Container>
  );
};

export default Favorites;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
