import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { useCoursesQuery } from "../generated/graphql";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import SearchCourse from "./SearchCourse";
import { AppParamList } from "../utils/params";
import { StackNavigationProp } from "@react-navigation/stack";
import LottieView from "lottie-react-native";

interface SearchContentProps {
  search?: string;
  categoryId?: number;
  navigation: StackNavigationProp<AppParamList, "Search">;
}

const SearchContent: React.FC<SearchContentProps> = ({
  search,
  categoryId,
  navigation,
}) => {
  const [cursor, setCursor] = useState<number | null>(null);
  const [{ data }] = useCoursesQuery({
    variables: {
      limit: 10,
      search: search,
      categoryId,
      cursor,
    },
  });

  return (
    <ScrollView>
      {data?.courses.courses.map((course, index) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home", {
              courseId: course.id,
              categoryUrl: course.category.imageUrl,
              categoryId: course.category.id,
              categoryName: course.category.name,
              isBestSeller: true,
            } as any);
          }}
        >
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
        </TouchableOpacity>
      ))}
      {data?.courses.hasMore ? (
        <TouchableOpacity
          onPress={() =>
            setCursor(
              data.courses.courses[data.courses.courses.length - 1].createdAt
            )
          }
        >
          <Text>See more</Text>
        </TouchableOpacity>
      ) : null}
      <View>
        {/* <LottieView
          style={{
            width: 100,
            height: 100,
          }}
          autoPlay
          loop
          source={require("../assets/json/loading.json")}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        /> */}
      </View>
    </ScrollView>
  );
};

export default SearchContent;

const Text = styled.Text``;

const View = styled.View``;
