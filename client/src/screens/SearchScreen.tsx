import React, { useEffect, useRef, useState } from "react";
import styled, { DefaultTheme } from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard, ScrollView, TouchableOpacity } from "react-native";
import SearchContent from "../components/SearchContent";
import { useCategoriesQuery, useGetThemeQuery } from "../generated/graphql";
import { themeModify } from "../utils/themeModify";
import { AppBottomTabProps, HomeStackNavProps } from "../utils/params";
import Logo from "../components/Logo";
import { toParamsMap } from "../utils/toParamMap";

interface ProjectsScreenProps {
  screen: AppBottomTabProps<"Search">;
}

const SearchScreen = ({ route, navigation }: AppBottomTabProps<"Search">) => {
  const [listParams, setListParams] = useState<Record<string, object>>({});
  const [search, setSearch] = useState("");
  const [isSubmit, setIsSubmit] = useState<undefined | string>();
  const [color] = useGetThemeQuery();
  const theme: DefaultTheme = {
    input: {
      background: themeModify("#fffefc", color.data?.getTheme),
      color: themeModify("#5d5d5d", color.data?.getTheme),
    },
    container: {
      background: themeModify("#ffff", color.data?.getTheme),
    },
  };
  const [cate] = useCategoriesQuery();

  useEffect(() => {
    if (route?.params) {
      setListParams(toParamsMap(route.params));
    }
  }, [route.params, isSubmit]);

  return (
    <Container theme={theme}>
      <View style={{ zIndex: -1 }}>
        <SearchInput
          style={{
            shadowColor: themeModify("#000", theme.data?.getTheme),
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
          }}
          theme={theme}
          onChangeText={(text: any) => setSearch(text)}
          value={search}
          placeholder="Search courses"
          onSubmitEditing={() => {
            if (search === "") setIsSubmit(undefined);
            else setIsSubmit(search);
            console.log(isSubmit);
          }}
        ></SearchInput>
      </View>
      <SearchIcon>
        <EvilIcons
          name="search"
          size={30}
          color={themeModify("#000", color.data?.getTheme)}
        />
      </SearchIcon>
      {search === "" ? null : (
        <CloseIcon onPress={() => setSearch("")}>
          <AntDesign
            name="close"
            size={25}
            color={themeModify("#000", color.data?.getTheme)}
          />
        </CloseIcon>
      )}
      <ScrollView>
        <ScrollView
          style={{
            flexDirection: "row",
            paddingTop: 30,
            marginLeft: 15,
            height: 115,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {cate.data?.categories.map((category) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Search", {
                    categoryId: category.id,
                  } as any);
                }}
              >
                <Logo
                  key={category.id}
                  image={category.imageUrl}
                  text={category.name}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <SearchContent
          search={isSubmit}
          categoryId={listParams["categoryId"]}
        />
      </ScrollView>
    </Container>
  );
};

export default SearchScreen;

const SearchIcon = styled.TouchableOpacity`
  top: 43;
  left: 10;
  width: 50px;
  height: 50px;
  position: absolute;
`;

const CloseIcon = styled.TouchableOpacity`
  top: 43;
  right: 10;
  position: absolute;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background: ${(props: any) => props.theme.container.background};
`;

const SearchInput = styled.TextInput`
  /* height: 70px; */
  padding: 40px 50px 16px 60px;
  font-size: 18px;
  /* max-height: 150px; */
  width: 100%;
  background-color: ${(props: any) => props.theme.input.background};
  color: ${(props: any) => props.theme.input.color};
`;

const Button = styled.TouchableOpacity``;

const Text = styled.Text``;

const View = styled.View``;
