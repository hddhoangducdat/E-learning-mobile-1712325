import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { useCoursesQuery } from "../generated/graphql";
import { ScrollView } from "react-native-gesture-handler";
import ReverseCourse from "./ReverseCourse";
import SearchCourse from "./SearchCourse";

interface SearchContentProps {
  search?: string;
  categoryId?: number;
}

const SearchContent: React.FC<SearchContentProps> = ({
  search,
  categoryId,
}) => {
  const [{ data }] = useCoursesQuery({
    variables: {
      limit: 15,
      search: search,
      categoryId,
    },
  });

  return (
    <ScrollView>
      {data?.courses.courses.map((course, index) => (
        <SearchCourse
          key={index}
          image={course.imageUrl}
          caption={course.title}
          logo={course.category.imageUrl}
          subtitle={course.subtitle}
          rate={course.rateNumber}
          participant={course.soldNumber}
          price={course.price}
          category={course.category.name}
          isBestSeller={false}
        />
      ))}
    </ScrollView>
  );
};

export default SearchContent;

const Button = styled.TouchableOpacity``;

const Text = styled.Text``;

const View = styled.View``;
