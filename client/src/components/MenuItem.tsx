import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useGetThemeQuery } from "../generated/graphql";
import { themeModify } from "../utils/themeModify";

interface menuItem {
  icon: string;
  title: string;
  text?: string;
  data?: boolean;
}

const MenuItem = (props: menuItem) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  const [{ data }] = useGetThemeQuery();

  useEffect(() => {
    if (props.data !== undefined) setIsEnabled(props.data);
  }, [props.data]);

  return (
    <Container>
      <IconView>
        {props.icon === "language" ? (
          <FontAwesome name="language" size={24} color="#546bfb" />
        ) : props.icon === "theme-light-dark" ? (
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color="#546bfb"
          />
        ) : (
          <Ionicons name={props.icon} size={24} color="#546bfb" />
        )}
      </IconView>
      <Content>
        <Title
          style={{
            color: themeModify("#3c4560", data?.getTheme),
          }}
        >
          {props.title}
        </Title>
        {props.icon === "language" || props.icon === "theme-light-dark" ? (
          <View>
            {props.icon === "language" ? (
              <Text
                style={{
                  color: themeModify("#3c4560", data?.getTheme),
                  marginRight: 10,
                }}
              >
                {isEnabled ? "Vietnames" : "English"}
              </Text>
            ) : (
              <Text
                style={{
                  color: themeModify("#3c4560", data?.getTheme),
                  marginRight: 10,
                }}
              >
                {isEnabled ? "dark" : "light"}
              </Text>
            )}

            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            ></Switch>
          </View>
        ) : (
          <Text style={{ color: themeModify("#3c4560", data?.getTheme) }}>
            {props.text}
          </Text>
        )}
      </Content>
    </Container>
  );
};

export default MenuItem;

const View = styled.View`
  flex-direction: row;
`;

const Switch = styled.Switch`
  /* position: absolute;
  top: 35px;
  left: 15px; */
`;

const Container = styled.View`
  flex-direction: row;
  margin: 15px 0;
`;

const IconView = styled.View`
  width: 32;
  height: 32;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  padding-left: 20;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 24;
  font-weight: 600;
`;

const Text = styled.Text`
  color: #3c4560;
  font-weight: 600;
  opacity: 0.6;
  margin-top: 5px;
`;
