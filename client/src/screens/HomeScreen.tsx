import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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
import {
  useMeQuery,
  useCategoriesQuery,
  useCoursesQuery,
} from "../generated/graphql";
import ReverseCourse from "../components/ReverseCourse";
import PopUpNoti from "../components/PopUpNoti";

const HomeScreen = ({ navigation }: HomeStackNavProps<"Home">) => {
  const dispatch = useDispatch();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const { openMenu, tabBarVisible } = useSelector(
    (state: ReduxReducers) => state
  );
  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [{ data }] = useMeQuery();
  const [cate] = useCategoriesQuery();

  const [bestSeller] = useCoursesQuery({
    variables: {
      limit: 10,
      orderType: "BEST_SELLER",
    },
  });

  const [topRated] = useCoursesQuery({
    variables: {
      limit: 10,
      orderType: "RATE",
    },
  });

  const [newestCourses] = useCoursesQuery({
    variables: {
      limit: 10,
    },
  });

  useEffect(() => {
    toggleMenu();
  });

  const toggleMenu = () => {
    if (openMenu) {
      if (!data?.me) {
        setOpenAuthForm(true);
        if (tabBarVisible) {
          dispatch({ type: TRIGGER_TAB_BAR, payload: false });
        }
      } else {
        setOpenAuthForm(false);
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
          <PopUpNoti />
          <ScrollView style={{ height: "100%" }}>
            <TitleBar>
              <TouchableOpacity
                onPress={() => {
                  dispatch({ type: TRIGGER_TAB_BAR, payload: false });
                  dispatch({ type: TRIGGER_MENU, payload: true });
                }}
                style={{ position: "absolute", top: 0, left: 20 }}
              >
                {data?.me ? (
                  <Avatar source={{ uri: data.me.avatar }} />
                ) : (
                  <Avatar
                    source={require("../assets/images/avatar-icon.png")}
                  />
                )}
              </TouchableOpacity>
              {data?.me ? (
                <>
                  <Title>Welcome back,</Title>
                  <Name>{data.me.username}</Name>
                </>
              ) : (
                <>
                  <Name style={{ marginTop: 8 }}>Getting started</Name>
                </>
              )}

              <NotificationButton />
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
                height: 115,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {cate.data?.categories.map((category) => {
                return (
                  <Logo
                    key={category.id}
                    image={category.imageUrl}
                    text={category.name}
                  />
                );
              })}
            </ScrollView>
            <Subtitle>Most Popular Courses</Subtitle>

            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30, height: 350 }}
              showsHorizontalScrollIndicator={false}
            >
              {bestSeller.data?.courses.courses.map((card, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.push("Section", {
                        courseId: card.id,
                        categoryUrl: card.category.imageUrl,
                        categoryName: card.category.name,
                        isBestSeller: true,
                      } as any);
                    }}
                  >
                    {bestSeller.fetching ? null : (
                      <Card
                        image={card.imageUrl}
                        caption={card.title}
                        logo={card.category.imageUrl}
                        subtitle={card.subtitle}
                        rate={card.rateNumber}
                        participant={card.soldNumber}
                        price={card.price}
                        isBestSeller={true}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
              <MoreView
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,

                  elevation: 7,
                }}
              >
                <MaterialIcons name="navigate-next" size={50} color="white" />
              </MoreView>
            </ScrollView>
            <Subtitle>Top rated courses</Subtitle>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30, height: 350 }}
              showsHorizontalScrollIndicator={false}
            >
              {topRated.data?.courses.courses.map((card, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.push("Section");
                    }}
                  >
                    {topRated.fetching ? null : (
                      <Card
                        image={card.imageUrl}
                        caption={card.title}
                        logo={card.category.imageUrl}
                        subtitle={card.subtitle}
                        rate={card.rateNumber}
                        participant={card.soldNumber}
                        price={card.price}
                        isBestSeller={false}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
              <TopRatedMoreView
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,

                  elevation: 7,
                }}
              >
                <MaterialIcons name="navigate-next" size={50} color="white" />
              </TopRatedMoreView>
            </ScrollView>

            <HeaderContainer>
              <Subtitle>Our new courses</Subtitle>
              <TouchableOpacity>
                <More>See all</More>
              </TouchableOpacity>
            </HeaderContainer>
            {newestCourses.data?.courses.courses.map((course, index) => (
              <ReverseCourse
                key={index}
                image={course.imageUrl}
                caption={course.title}
                logo={course.category.imageUrl}
                subtitle={course.subtitle}
                rate={course.rateNumber}
                participant={course.soldNumber}
                price={course.price}
                isBestSeller={false}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    </RootView>
  );
};

export default HomeScreen;

const MoreView = styled.View`
  background-color: #3d23cf;
  justify-content: center;
  align-items: center;
  height: 290px;
  width: 70px;
  margin-right: 20px;
  margin-top: 20px;
`;

const TopRatedMoreView = styled.View`
  background-color: #23cf96;
  justify-content: center;
  align-items: center;
  height: 290px;
  width: 70px;
  margin-right: 20px;
  margin-top: 20px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
`;

const RootView = styled.View`
  position: relative;
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  /* margin-top: 20px; */
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

const More = styled.Text`
  font-size: 15px;
  margin-left: 135px;
  color: #000;
`;
