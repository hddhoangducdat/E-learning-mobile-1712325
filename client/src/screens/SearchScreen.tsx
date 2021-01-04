import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import SearchContent from "../components/SearchContent";

interface ProjectsScreenProps {}

const SearchScreen: React.FC<ProjectsScreenProps> = ({}) => {
  const [search, setSearch] = useState("");
  const [isSubmit, setIsSubmit] = useState("");

  return (
    <Container>
      <View style={{ zIndex: 1 }}>
        <SearchInput
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
          }}
          placeholder="Search"
          onChangeText={(result: any) => setSearch(result)}
          defaultValue={search}
          onSubmitEditing={() => setIsSubmit(search)}
        />
      </View>
      <Button style={{ position: "absolute", top: 40, left: 10, zIndex: 100 }}>
        <EvilIcons name="search" size={34} color="black" />
      </Button>
      {search === "" ? null : (
        <Button
          onPress={() => {
            Keyboard.dismiss();
            setSearch("");
          }}
          style={{ position: "absolute", top: 43, right: 14, zIndex: 100 }}
        >
          <AntDesign name="close" size={24} color="#999999" />
        </Button>
      )}
      {isSubmit === "" ? null : <SearchContent search={isSubmit} />}
    </Container>
  );
};

export default SearchScreen;

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background: #fff;
`;

const SearchInput = styled.TextInput`
  /* height: 70px; */
  padding: 40px 50px 16px 60px;
  font-size: 18px;
  /* max-height: 150px; */
  width: 100%;
  background-color: #fff;
  color: #5d5d5d;
`;

const Button = styled.TouchableOpacity``;

const Text = styled.Text``;

const View = styled.View``;
