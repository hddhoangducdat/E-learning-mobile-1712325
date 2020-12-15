import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { ReduxReducers, TRIGGER_MENU, TRIGGER_TAB_BAR } from "../../types";
import Card from "../components/Card";
import Course from "../components/Course";
import Logo from "../components/Logo";
import Menu from "../components/Menu";
import { HomeStackNavProps } from "../utils/params";
import AuthForm from "../components/form/AuthForm";
import NotificationButton from "../components/NotificationButton";
import { useMeQuery } from "../generated/graphql";

const HomeScreen = ({ navigation }: HomeStackNavProps<"Home">) => {
  const dispatch = useDispatch();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const { openMenu, tabBarVisible } = useSelector(
    (state: ReduxReducers) => state
  );
  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [{ data }] = useMeQuery();

  useEffect(() => {
    toggleMenu();
  });

  const toggleMenu = () => {
    if (openMenu) {
      if (!data?.me) {
        setOpenAuthForm(true);
        if (tabBarVisible) {
          dispatch({ type: TRIGGER_TAB_BAR });
        }
      } else {
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0.9,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.quad,
          }),
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
        StatusBar.setBarStyle("light-content", true);
      }
    } else {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };

  return (
    <RootView>
      <Menu me={data!} />
      {openAuthForm ? <AuthForm setOpenAuthForm={setOpenAuthForm} /> : null}
      <AnimatedContainer
        style={{
          transform: [{ scale }],
          opacity,
        }}
      >
        <SafeAreaView>
          <ScrollView style={{ height: "100%" }}>
            <TitleBar>
              <TouchableOpacity
                onPress={() => dispatch({ type: TRIGGER_MENU })}
                style={{ position: "absolute", top: 0, left: 20 }}
              >
                <Avatar source={require("../assets/images/avatar.jpg")} />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>Dat</Name>

              <NotificationButton />
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {logos.map((logo, index) => {
                return <Logo key={index} image={logo.image} text={logo.text} />;
              })}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              {cards.map((card, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.push("Section");
                    }}
                  >
                    <Card
                      title={card.title}
                      image={card.image}
                      caption={card.caption}
                      logo={card.logo}
                      subtitle={card.subtitle}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Subtitle>Popular Courses</Subtitle>
            {courses.map((course, index) => (
              <Course
                key={index}
                image={course.image}
                title={course.title}
                subtitle={course.subtitle}
                logo={course.logo}
                author={course.author}
                avatar={course.avatar}
                caption={course.caption}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    </RootView>
  );
};

export default HomeScreen;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const logos = [
  {
    image: require("../assets/images/logo-framerx.png"),
    text: "Framer X",
  },
  {
    image: require("../assets/images/logo-figma.png"),
    text: "Figma",
  },
  {
    image: require("../assets/images/logo-studio.png"),
    text: "Studio",
  },
  {
    image: require("../assets/images/logo-react.png"),
    text: "React",
  },
  {
    image: require("../assets/images/logo-swift.png"),
    text: "Swift",
  },
  {
    image: require("../assets/images/logo-sketch.png"),
    text: "Sketch",
  },
];

const cards = [
  {
    title: "React Native for Designers",
    image: require("../assets/images/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 sections",
    logo: require("../assets/images/logo-react.png"),
  },
  {
    title: "Styled Components",
    image: require("../assets/images/background12.jpg"),
    subtitle: "React Native",
    caption: "2 of 12 sections",
    logo: require("../assets/images/logo-react.png"),
  },
  {
    title: "Props and Icons",
    image: require("../assets/images/background13.jpg"),
    subtitle: "React Native",
    caption: "3 of 12 sections",
    logo: require("../assets/images/logo-react.png"),
  },
  {
    title: "Static Data and Loop",
    image: require("../assets/images/background14.jpg"),
    subtitle: "React Native",
    caption: "4 of 12 sections",
    logo: require("../assets/images/logo-react.png"),
  },
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/images/background13.jpg"),
    logo: require("../assets/images/logo-studio.png"),
    author: "Meng To",
    avatar: require("../assets/images/avatar.jpg"),
    caption: "Design and interactive prototype",
  },
  {
    title: "React for Designers",
    subtitle: "12 sections",
    image: require("../assets/images/background11.jpg"),
    logo: require("../assets/images/logo-react.png"),
    author: "Meng To",
    avatar: require("../assets/images/avatar.jpg"),
    caption: "Learn to design and code a React site",
  },
  {
    title: "Design and Code with Framer X",
    subtitle: "10 sections",
    image: require("../assets/images/background14.jpg"),
    logo: require("../assets/images/logo-framerx.png"),
    author: "Meng To",
    avatar: require("../assets/images/avatar.jpg"),
    caption: "Create powerful design and code components for your app",
  },
  {
    title: "Design System in Figma",
    subtitle: "10 sections",
    image: require("../assets/images/background6.jpg"),
    logo: require("../assets/images/logo-figma.png"),
    author: "Meng To",
    avatar: require("../assets/images/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool",
  },
];
