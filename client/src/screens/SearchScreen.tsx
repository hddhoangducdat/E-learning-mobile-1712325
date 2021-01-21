import React, { useEffect, useRef, useState } from "react";
import styled, { DefaultTheme } from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard, ScrollView, TouchableOpacity } from "react-native";
import SearchContent, { SearchContentProps } from "../components/SearchContent";
import {
  useCategoriesQuery,
  useGetHistoryQuery,
  useGetThemeQuery,
  useSaveHistoryMutation,
  useRemoveHistoryMutation,
} from "../generated/graphql";
import { themeModify } from "../utils/themeModify";
import { AppBottomTabProps, HomeStackNavProps } from "../utils/params";
import Logo from "../components/Logo";
import { FontAwesome } from "@expo/vector-icons";

const SearchScreen = ({ route, navigation }: AppBottomTabProps<"Search">) => {
  // const [listParams, setListParams] = useState<Record<string, object>>({});
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<null | number>(
    route.params ? route.params.categoryId : null
  );
  const [cursor, setCursor] = useState<number | null>(null);
  const [orderType, setOrderType] = useState<null | string>(
    route.params ? route.params.orderType : null
  );

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
    history: {
      background: themeModify("#ffff", color.data?.getTheme),
      color: themeModify("#000", color.data?.getTheme),
    },
  };
  const [cate] = useCategoriesQuery();
  const [history] = useGetHistoryQuery();
  const [, saveHistory] = useSaveHistoryMutation();
  const [, removeHistory] = useRemoveHistoryMutation();

  console.log(orderType);

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
          placeholderTextColor={themeModify("#000", theme.data?.getTheme)}
          theme={theme}
          onChangeText={(text: any) => setSearch(text)}
          value={search}
          placeholder="Search courses"
          onSubmitEditing={() => {
            if (search === "") setIsSubmit(undefined);
            else {
              saveHistory({ search });
              setIsSubmit(search);
              setSearch("");
            }
          }}
        ></SearchInput>
      </View>
      {search.trim() === "" ? null : (
        <History
          style={{
            shadowColor: themeModify("#000", theme.data?.getTheme),
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,

            elevation: 7,
            borderRadius: 10,
          }}
        >
          {history.data?.getHistory.map((text: string, index) => {
            return (
              <View key={index}>
                <HistoryItem
                  onPress={() => {
                    setSearch("");
                    setIsSubmit(text);
                    setCursor(null);
                  }}
                  theme={theme}
                >
                  <HistoryText theme={theme}>{text}</HistoryText>
                  <TouchableOpacity
                    style={{ position: "absolute", right: 10, top: 8 }}
                    onPress={() => removeHistory({ search: text })}
                  >
                    <FontAwesome name="eraser" size={20} color="#ad9a9a" />
                  </TouchableOpacity>
                </HistoryItem>
              </View>
            );
          })}
        </History>
      )}

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
          <TouchableOpacity
            onPress={() => {
              setCategoryId(null);
              setOrderType(null);
              setCursor(null);
            }}
          >
            <Logo text={"All"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!orderType) {
                setOrderType("BEST_SELLER");
              } else {
                setOrderType(null);
              }
              setCursor(null);
            }}
          >
            <Logo
              text={<AntDesign name="linechart" size={24} color="black" />}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!orderType) {
                setOrderType("RATE");
              } else {
                setOrderType(null);
              }
              setCursor(null);
            }}
          >
            <Logo text={<AntDesign name="staro" size={24} color="black" />} />
          </TouchableOpacity>
          {cate.data?.categories.map((category) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate("Search", {
                  //   categoryId: category.id,
                  // } as any);
                  setCategoryId(category.id);
                  setCursor(null);
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
          navigation={navigation}
          search={isSubmit}
          categoryId={categoryId}
          orderType={orderType}
          cursor={cursor}
          setCursor={setCursor}
        />
      </ScrollView>
    </Container>
  );
};

export default SearchScreen;

const Text = styled.Text``;

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

const View = styled.View``;

const History = styled.View`
  position: absolute;
  left: 60;
  top: 92;
  z-index: 10000;
`;

const HistoryItem = styled.TouchableOpacity`
  background-color: ${(props: any) => props.theme.history.background};
  width: 280px;
  padding: 8px 16px;
`;

const HistoryText = styled.Text`
  color: ${(props: any) => props.theme.history.color};
`;

const BorderTop = styled.View`
  height: 0.2px;
  width: 100%;
  background-color: #fff;
`;
