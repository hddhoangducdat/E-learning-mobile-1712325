import React from "react";
import styled from "styled-components/native";
import { useMyFavoriteQuery } from "../generated/graphql";
import Favorite from "./Favorite";

const Favorites = () => {
  const [{ data }] = useMyFavoriteQuery();
  console.log(data);

  return (
    <Container>
      {data?.myFavorite
        ? data?.myFavorite.map((course, index) => (
            <Favorite
              key={index}
              id={course.id}
              logo={course.category.imageUrl}
              image={course.imageUrl}
              title={course.title}
              subtitle={course.subtitle}
              rate={course.rateNumber}
              student={course.soldNumber}
            />
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
