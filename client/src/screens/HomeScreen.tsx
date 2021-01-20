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
import Course from "../components/Favorite";
import Logo from "../components/Logo";
import Menu from "../components/Menu";
import { HomeStackNavProps } from "../utils/params";
import AuthForm from "../components/form/AuthForm";
import {
  useMeQuery,
  useCategoriesQuery,
  useCoursesQuery,
  useGetLanguageQuery,
  useGetThemeQuery,
  useRecommendQuery,
  useCoursesPresentQuery,
} from "../generated/graphql";
import ReverseCourse from "../components/ReverseCourse";
import PopUpNoti from "../components/PopUpNoti";
import { languageModify } from "../utils/languageModify";
import { themeModify } from "../utils/themeModify";
import ActivateButton from "../components/ActivateButton";
import ActivateForm from "../components/form/ActivateForm";
import LottieView from "lottie-react-native";
import { SearchContentProps } from "../components/SearchContent";

const HomeScreen = ({ route, navigation }: HomeStackNavProps<"Home">) => {
  const [theme] = useGetThemeQuery();
  const [language] = useGetLanguageQuery();
  const { openMenu, tabBarVisible } = useSelector(
    (state: ReduxReducers) => state
  );
  const dispatch = useDispatch();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [{ data }] = useMeQuery();
  const [cate] = useCategoriesQuery();

  const [bestSeller] = useCoursesPresentQuery({
    variables: {
      limit: 10,
      orderType: "BEST_SELLER",
    },
  });

  const [topRated] = useCoursesPresentQuery({
    variables: {
      limit: 10,
      orderType: "RATE",
    },
  });

  const [newestCourses] = useCoursesPresentQuery({
    variables: {
      limit: 10,
    },
  });

  const [recommend] = useRecommendQuery();

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

  const [activate, setActivate] = useState(false);

  return (
    <RootView>
      <ActivateForm activate={activate} setActivate={setActivate} />
      <Menu me={data!} />
      {openAuthForm ? <AuthForm setOpenAuthForm={setOpenAuthForm} /> : null}
      <AnimatedContainer
        style={{
          transform: [{ scale }],
          opacity,
          backgroundColor: themeModify("#f0f3f5", theme.data?.getTheme),
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
                  <Title>
                    {languageModify("Welcome back", language.data?.getLanguage)}
                  </Title>
                  <Name
                    style={{
                      color: themeModify("#3c4560", theme.data?.getTheme),
                    }}
                  >
                    {data.me.username}
                  </Name>
                </>
              ) : (
                <>
                  <Name style={{ marginTop: 8 }}>Getting started</Name>
                </>
              )}

              <ActivateButton setActivate={setActivate} />
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: "row",
                paddingTop: 30,
                height: 115,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {cate.data?.categories.map((category, index) => {
                return (
                  <TouchableOpacity
                    key={index}
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

            <Subtitle>
              {languageModify("Recommend for you", language.data?.getLanguage)}
            </Subtitle>

            {!recommend.fetching ? (
              recommend.data?.recommend.length !== 0 ? (
                <ScrollView
                  horizontal={true}
                  style={{ paddingBottom: 30, height: 310 }}
                  showsHorizontalScrollIndicator={false}
                >
                  {recommend.data?.recommend.map((card, index) => {
                    return (
                      <Card
                        key={index}
                        id={card.id}
                        categoryId={card.category.id}
                        navigation={navigation}
                        categoryName={card.category.name}
                        image={card.imageUrl}
                        caption={card.title}
                        logo={card.category.imageUrl}
                        subtitle={card.subtitle}
                        rate={card.rateNumber}
                        participant={card.soldNumber}
                        price={card.price}
                        favorite={card.favorite.userId !== -1 ? true : false}
                        isBestSeller={true}
                      />
                    );
                  })}
                </ScrollView>
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: 200,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LottieView
                    style={{
                      width: 250,
                      height: 250,
                    }}
                    autoPlay
                    loop
                    source={require("../assets/json/629-empty-box.json")}
                    // OR find more Lottie files @ https://lottiefiles.com/featured
                    // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                  />
                </View>
              )
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LottieView
                  style={{
                    width: 250,
                    height: 250,
                  }}
                  autoPlay
                  loop
                  source={require("../assets/json/260-3d-rotate-loading-animation.json")}
                  // OR find more Lottie files @ https://lottiefiles.com/featured
                  // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                />
              </View>
            )}

            <Subtitle>
              {languageModify(
                "Most Popular Courses",
                language.data?.getLanguage
              )}
            </Subtitle>

            {!bestSeller.fetching ? (
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30, height: 310 }}
                showsHorizontalScrollIndicator={false}
              >
                {bestSeller.data?.coursesPresent.courses.map((card, index) => {
                  return (
                    <Card
                      key={index}
                      id={card.id}
                      categoryId={card.category.id}
                      navigation={navigation}
                      categoryName={card.category.name}
                      image={card.imageUrl}
                      caption={card.title}
                      logo={card.category.imageUrl}
                      subtitle={card.subtitle}
                      rate={card.rateNumber}
                      participant={card.soldNumber}
                      price={card.price}
                      favorite={card.favorite.userId !== -1 ? true : false}
                      isBestSeller={true}
                    />
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
                  onPress={() => {
                    navigation.navigate("Search", {
                      orderType: "BEST_SELLER",
                    } as any);
                  }}
                >
                  <MaterialIcons name="navigate-next" size={50} color="white" />
                </MoreView>
              </ScrollView>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LottieView
                  style={{
                    width: 180,
                    height: 180,
                  }}
                  autoPlay
                  loop
                  source={require("../assets/json/226-splashy-loader.json")}
                  // OR find more Lottie files @ https://lottiefiles.com/featured
                  // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                />
              </View>
            )}

            <Subtitle>
              {languageModify("Top rated courses", language.data?.getLanguage)}
            </Subtitle>
            {!topRated.fetching ? (
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30, height: 310 }}
                showsHorizontalScrollIndicator={false}
              >
                {topRated.data?.coursesPresent.courses.map((card, index) => {
                  return (
                    <Card
                      key={index}
                      id={card.id}
                      categoryId={card.category.id}
                      navigation={navigation}
                      categoryName={card.category.name}
                      image={card.imageUrl}
                      caption={card.title}
                      logo={card.category.imageUrl}
                      subtitle={card.subtitle}
                      rate={card.rateNumber}
                      participant={card.soldNumber}
                      price={card.price}
                      favorite={card.favorite.userId !== -1 ? true : false}
                      isBestSeller={false}
                    />
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
                  onPress={() => {
                    navigation.navigate("Search", {
                      orderType: "RATE",
                    } as any);
                  }}
                >
                  <MaterialIcons name="navigate-next" size={50} color="white" />
                </TopRatedMoreView>
              </ScrollView>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LottieView
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  autoPlay
                  loop
                  source={require("../assets/json/196-material-wave-loading.json")}
                  // OR find more Lottie files @ https://lottiefiles.com/featured
                  // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                />
              </View>
            )}

            <HeaderContainer>
              <Subtitle>
                {languageModify("Our new courses", language.data?.getLanguage)}
              </Subtitle>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Search");
                }}
              >
                <More
                  style={{ color: themeModify("#000", theme.data?.getTheme) }}
                >
                  {languageModify("See all", language.data?.getLanguage)}
                </More>
              </TouchableOpacity>
            </HeaderContainer>
            {!newestCourses.fetching ? (
              newestCourses.data?.coursesPresent.courses.map(
                (course, index) => (
                  <ReverseCourse
                    key={index}
                    id={course.id}
                    navigation={navigation}
                    categoryId={course.category.id}
                    categoryName={course.category.name}
                    image={course.imageUrl}
                    caption={course.title}
                    logo={course.category.imageUrl}
                    subtitle={course.subtitle}
                    rate={course.rateNumber}
                    participant={course.soldNumber}
                    price={course.price}
                    isBestSeller={false}
                  />
                )
              )
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LottieView
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  autoPlay
                  loop
                  source={require("../assets/json/222-trail-loading.json")}
                  // OR find more Lottie files @ https://lottiefiles.com/featured
                  // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                />
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    </RootView>
  );
};

export default HomeScreen;

const MoreView = styled.TouchableOpacity`
  background-color: #3d23cf;
  justify-content: center;
  align-items: center;
  height: 245px;
  width: 70px;
  margin-right: 20px;
  margin-top: 20px;
`;

const TopRatedMoreView = styled.TouchableOpacity`
  background-color: #23cf96;
  justify-content: center;
  align-items: center;
  height: 245px;
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

const View = styled.View``;
