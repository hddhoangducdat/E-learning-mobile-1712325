import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import {
  Animated,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { ReduxReducers, TRIGGER_MENU, TRIGGER_TAB_BAR } from "../../types";
import {
  MeQuery,
  useChangeLanguageMutation,
  useChangeThemeMutation,
  useGetLanguageQuery,
  useGetThemeQuery,
  useLogoutMutation,
} from "../generated/graphql";
import AccountForm from "./Account";
import { themeModify } from "../utils/themeModify";
import { Restart } from "fiction-expo-restart";

const screenHeight = Dimensions.get("window").height;

interface MenuProps {
  me: MeQuery;
}

const Menu = ({ me }: MenuProps) => {
  const top = useRef(new Animated.Value(screenHeight)).current;
  const { openMenu } = useSelector((state: ReduxReducers) => state);
  const dispatch = useDispatch();
  const [, logout] = useLogoutMutation();
  const [openAccountForm, setOpenAccountForm] = useState(false);
  const [theme] = useGetThemeQuery();
  const [language] = useGetLanguageQuery();
  const [, changeLanguage] = useChangeLanguageMutation();
  const [, changeTheme] = useChangeThemeMutation();

  useEffect(() => {
    toggleMenu();
  });

  const toggleMenu = () => {
    if (me?.me) {
      if (openMenu) {
        Animated.spring(top, {
          toValue: 54,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(top, {
          toValue: screenHeight,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  return (
    <AnimatedContainer style={{ top }}>
      {openAccountForm ? (
        <AccountForm setOpenAccountForm={setOpenAccountForm} />
      ) : null}
      <Cover>
        <Image source={require("../assets/images/background2.jpg")} />
        <Title>{me?.me?.username}</Title>
        <Subtitle>{me?.me?.email}</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: TRIGGER_TAB_BAR, payload: true });
          dispatch({ type: TRIGGER_MENU });
        }}
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          marginLeft: -22,
          zIndex: 1,
        }}
      >
        <CloseView
          style={{
            shadowColor: themeModify("#000", theme.data?.getTheme),
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 5,
            backgroundColor: themeModify("white", theme.data?.getTheme),
          }}
        >
          <AntDesign name="close" size={22} color="#5463fb" />
        </CloseView>
      </TouchableOpacity>
      <Content
        style={{
          backgroundColor: themeModify("#f0f3f5", theme.data?.getTheme),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: TRIGGER_TAB_BAR, payload: false });
            setOpenAccountForm(true);
          }}
        >
          <MenuItem
            icon={items.account.icon}
            title={items.account.title}
            text={items.account.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const my_theme =
              theme.data?.getTheme === "Light" ? "Dark" : "Light";
            await AsyncStorage.setItem("theme", my_theme);
            changeTheme({
              theme: my_theme,
            });
          }}
        >
          <MenuItem
            icon={items.theme.icon}
            title={items.theme.title}
            data={theme.data?.getTheme === "Dark" ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const result = await changeLanguage({
              language: language.data?.getLanguage === "vi" ? "en" : "vi",
            });
            if (result.data?.changeLanguage) {
              Restart();
            }
          }}
        >
          <MenuItem
            icon={items.language.icon}
            title={items.language.title}
            data={language.data?.getLanguage === "vi" ? true : false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: TRIGGER_MENU });
            logout();
          }}
        >
          <MenuItem
            icon={items.logout.icon}
            title={items.logout.title}
            text={items.logout.text}
          />
        </TouchableOpacity>
      </Content>
    </AnimatedContainer>
  );
};

export default Menu;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  height: ${screenHeight};

  padding: 50px;
`;

const items = {
  account: {
    icon: "ios-cog",
    title: "Account",
    text: "settings",
  },
  theme: {
    icon: "theme-light-dark",
    title: "Theme",
  },
  language: {
    icon: "language",
    title: "Switch language",
  },
  logout: {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!",
  },
};
