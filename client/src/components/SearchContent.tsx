import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { useCoursesQuery, useGetThemeQuery } from "../generated/graphql";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import SearchCourse from "./SearchCourse";
import { AppParamList } from "../utils/params";
import { StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { themeModify } from "../utils/themeModify";
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get("window").width - 5;

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

  useEffect(() => {
    setCursor(null);
  }, [categoryId]);

  const [{ data }] = useCoursesQuery({
    variables: {
      limit: 5,
      search,
      categoryId,
      cursor,
    },
  });

  const [theme] = useGetThemeQuery();

  if (!data?.courses.courses)
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
            width: 400,
            height: 400,
          }}
          autoPlay
          loop
          source={require("../assets/json/222-trail-loading.json")}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
      </View>
    );

  return (
    <>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        style={{ width: windowWidth }}
      >
        {Array.from(
          { length: Math.ceil(data?.courses.courses.length / 5) },
          (_, i) => i + 1
        ).map((_, index) => {
          return (
            <>
              <ScrollView key={index} style={{ width: windowWidth }}>
                {data?.courses.courses
                  .slice(index * 5, index * 5 + 5)
                  .map((course, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate("Home", {
                            courseId: course.id,
                            categoryUrl: course.category.imageUrl,
                            categoryId: course.category.id,
                            categoryName: course.category.name,
                            isBestSeller: true,
                          } as any);
                        }}
                        style={{
                          width: windowWidth,
                        }}
                      >
                        <SearchCourse
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
                    );
                  })}
                {index + 1 === Math.ceil(data?.courses.courses.length / 5) &&
                data?.courses.hasMore ? (
                  <TouchableOpacity
                    style={{ alignItems: "center", marginBottom: 15 }}
                    onPress={() =>
                      setCursor(
                        data.courses.courses[data.courses.courses.length - 1]
                          .createdAt
                      )
                    }
                  >
                    <Feather
                      name="more-horizontal"
                      size={30}
                      color={themeModify("#000", theme.data?.getTheme)}
                    />
                  </TouchableOpacity>
                ) : null}
              </ScrollView>
            </>
          );
        })}
        {/* { data?.courses.courses.map((course, index) => {
          if (categoryId && course.category.id !== categoryId) return null;
          return (
            <>
              <ScrollView style={{ width: windowWidth }}>
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("Home", {
                      courseId: course.id,
                      categoryUrl: course.category.imageUrl,
                      categoryId: course.category.id,
                      categoryName: course.category.name,
                      isBestSeller: true,
                    } as any);
                  }}
                  style={{
                    width: windowWidth,
                  }}
                >
                  <SearchCourse
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
              </ScrollView>
            </>
          );
        })} */}
      </ScrollView>
    </>
  );
};

export default SearchContent;

const Text = styled.Text``;

const View = styled.View``;
