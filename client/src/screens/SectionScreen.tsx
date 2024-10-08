import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import {
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { HomeStackNavProps } from "../utils/params";
import { useDispatch } from "react-redux";
import { TRIGGER_TAB_BAR } from "../../types";
import WebView from "react-native-webview";
import {
  useFeedBacksQuery,
  useCourseQuery,
  useInstructorQuery,
  useIsOwnQuery,
  useMeQuery,
  usePurchaseMutation,
  useGetThemeQuery,
  useGetLanguageQuery,
  useCoursesQuery,
  useGetTrackCourseQuery,
} from "../generated/graphql";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Section from "../components/Section";
import { timeCalc } from "../utils/timeCalc";
import AuthForm from "../components/form/AuthForm";
import { useRate } from "../utils/useRate";
import VideoRendering from "../components/VideoRendering";
import { languageModify } from "../utils/languageModify";
import { themeModify } from "../utils/themeModify";
import Card from "../components/Card";
import { FeedBack } from "../components/FeedBack";
import PopUpNoti from "../components/PopUpNoti";

interface SectionScreenProps {}

const SectionScreen = ({ route, navigation }: HomeStackNavProps<"Section">) => {
  const [theme] = useGetThemeQuery();
  const [language] = useGetLanguageQuery();
  const {
    courseId,
    categoryUrl,
    isBestSeller,
    categoryName,
    categoryId,
  }: any = route.params;

  const [recommend] = useCoursesQuery({
    variables: {
      limit: 4,
      categoryId,
      orderType: "BEST_SELLER",
    },
  });

  const [isOwn] = useIsOwnQuery({
    variables: {
      courseId,
    },
  });

  const [{ data }] = useCourseQuery({
    variables: {
      id: courseId,
    },
  });
  const dispatch = useDispatch();
  const [instructor] = useInstructorQuery({
    variables: {
      instructorId: data?.course?.instructorId!,
    },
  });

  const [seeMore, setSeeMore] = useState({
    description: false,
    skills: false,
    instructor: false,
  });

  useEffect(() => {
    dispatch({ type: TRIGGER_TAB_BAR, payload: false });
    // const background =
    //   "../assets/images/background" + getRandomInt(16) + ".jpg";
    // setBanner(background);
    StatusBar.setBarStyle("light-content", true);
  }, [1]);

  const [banner, setBanner] = useState(
    require(`../assets/images/background1.jpg`)
  );

  const bottom = useRef(new Animated.Value(-50)).current;
  const [positionScrollView, setPositionScrollView] = useState(false);

  useEffect(() => {
    if (positionScrollView) {
      Animated.timing(bottom, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -50,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [positionScrollView]);

  const [track] = useGetTrackCourseQuery({
    variables: {
      courseId,
    },
  });

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (track.data?.getTrackCourse && !flag) {
      setFlag(true);
      navigation.push("Lesson", {
        lessonId: track.data?.getTrackCourse?.lessonId,
        categoryUrl,
        week: 1,
        lessonStt: 1,
        courseId,
      } as any);
    }
  }, [track.data?.getTrackCourse]);

  const [openAuthForm, setOpenAuthForm] = useState(false);

  const [, purchase] = usePurchaseMutation();

  const [me] = useMeQuery();

  const handlePurchase = () => {
    if (!me.data?.me) {
      setOpenAuthForm(true);
    } else if (!isOwn.data?.isOwn) {
      purchase({ courseId });
    } else {
    }
  };

  return (
    <Container>
      <PopUpNoti />
      {openAuthForm ? (
        <AuthForm isCourse={courseId} setOpenAuthForm={setOpenAuthForm} />
      ) : null}
      <AnimatedPayButton
        style={{
          bottom,
          backgroundColor: isOwn.data?.isOwn ? "#002fff" : "red",
        }}
      >
        <TouchableOpacity onPress={handlePurchase}>
          {isOwn.data?.isOwn ? (
            <PayButtonText>Go to Course</PayButtonText>
          ) : (
            <PayButtonText>
              {languageModify("Buy Now", language.data?.getLanguage)} -{" "}
              {data?.course?.price}
            </PayButtonText>
          )}
        </TouchableOpacity>
      </AnimatedPayButton>
      <ScrollView
        onScroll={(event: any) => {
          if (event.nativeEvent.contentOffset.y >= 495) {
            setPositionScrollView(true);
          } else {
            setPositionScrollView(false);
          }
        }}
      >
        <Container
          style={{
            backgroundColor: themeModify("#f0f3f5", theme.data?.getTheme),
          }}
        >
          <StatusBar hidden />
          <Cover>
            <Image source={banner} />
            <IntroductionWrap>
              <Wrapper>
                <Logo source={{ uri: categoryUrl }} />
                <Subtitle>{categoryName}</Subtitle>
              </Wrapper>
              <Title>{data?.course?.title}</Title>
              <View>
                <Caption>{data?.course?.subtitle}</Caption>
              </View>
              <RateContainer>
                {useRate(data?.course?.rateNumber! / 2)}
                <Rate>{data?.course?.rateNumber! / 2}</Rate>
                {isBestSeller ? (
                  <BestSellerImage
                    source={{
                      uri:
                        "https://www.psdstamps.com/wp-content/uploads/2020/04/grunge-best-seller-label-png.png",
                    }}
                  />
                ) : null}
              </RateContainer>
              <RateContainer>
                <TagIntro>
                  <FontAwesome name="user-o" size={10} color="white" />
                  <Text style={{ marginLeft: 5 }}>
                    {data?.course?.soldNumber + " Enrolled"}
                  </Text>
                </TagIntro>
                <TagIntro>
                  <Entypo name="back-in-time" size={10} color="white" />
                  <Text style={{ marginLeft: 5 }}>
                    {timeCalc(data?.course?.totalHours!) + " total hours"}
                  </Text>
                </TagIntro>
              </RateContainer>
              <RateContainer></RateContainer>
            </IntroductionWrap>
          </Cover>
          <TouchableOpacity
            onPress={() => {
              dispatch({ type: TRIGGER_TAB_BAR, payload: true });
              navigation.goBack();
            }}
            style={{ position: "absolute", top: 35, right: 20 }}
          >
            <CloseView>
              <AntDesign
                name="closecircleo"
                size={20}
                color="#fff"
                style={{ marginTop: -2 }}
              />
            </CloseView>
          </TouchableOpacity>
          <Content>
            <Marketing>
              <View style={{ height: 100 }}>
                <VideoRendering videoUrl={data?.course?.promoVidUrl} />
              </View>
              <TouchableOpacity onPress={handlePurchase}>
                <PayButton
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,

                    elevation: 7,
                    backgroundColor: isOwn.data?.isOwn ? "#002fff" : "red",
                  }}
                >
                  {isOwn.data?.isOwn ? (
                    <PayButtonText>Go to Course</PayButtonText>
                  ) : (
                    <PayButtonText>
                      {languageModify("Buy Now", language.data?.getLanguage)} -{" "}
                      {data?.course?.price}
                    </PayButtonText>
                  )}
                </PayButton>
              </TouchableOpacity>
            </Marketing>

            <WrapContain
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
                backgroundColor: themeModify("#ffff", theme.data?.getTheme),
              }}
            >
              <WrapContainHeader
                style={{ color: themeModify("#000", theme.data?.getTheme) }}
              >
                {languageModify(
                  "About this course",
                  language.data?.getLanguage
                )}
              </WrapContainHeader>
              <TextContain
                style={{
                  color: themeModify("#000", theme.data?.getTheme),
                }}
              >
                {data?.course?.description.slice(
                  0,
                  seeMore.description ? data.course.description.length : 70
                )}
                <TouchableOpacity
                  onPress={() => {
                    setSeeMore({ ...seeMore, description: true });
                  }}
                >
                  <TextContain style={{ color: "blue" }}>
                    {seeMore.description
                      ? ""
                      : languageModify("see more", language.data?.getLanguage)}
                  </TextContain>
                </TouchableOpacity>
              </TextContain>
            </WrapContain>

            <WrapContain
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
                backgroundColor: themeModify("#ffff", theme.data?.getTheme),
              }}
            >
              <WrapContainHeader
                style={{
                  color: themeModify("#000", theme.data?.getTheme),
                }}
              >
                {languageModify(
                  "Skills you will gains",
                  language.data?.getLanguage
                )}
              </WrapContainHeader>
              <TextContain
                style={{
                  color: themeModify("#000", theme.data?.getTheme),
                }}
              >
                {data?.course?.learnWhat}
              </TextContain>
            </WrapContain>

            <WrapContain
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
                backgroundColor: themeModify("#ffff", theme.data?.getTheme),
              }}
            >
              <WrapContainHeader
                style={{
                  color: themeModify("#000", theme.data?.getTheme),
                }}
              >
                {languageModify("Instructors", language.data?.getLanguage)}
              </WrapContainHeader>
              <Instructor>
                <InstructorAva
                  source={{ uri: instructor.data?.instructor.avatar }}
                />
                <InstructorDetail>
                  <TextContain
                    style={{
                      color: themeModify("#000", theme.data?.getTheme),
                      fontWeight: "700",
                      fontSize: 18,
                    }}
                  >
                    {instructor.data?.instructor.username}
                  </TextContain>
                  <TextContain style={{ color: "#777373" }}>
                    {instructor.data?.instructor.instructor?.major}
                  </TextContain>
                  <TextContain
                    style={{
                      color: themeModify("#000", theme.data?.getTheme),
                    }}
                  >
                    {instructor.data?.instructor.instructor?.intro.slice(
                      0,
                      seeMore.instructor
                        ? instructor.data?.instructor.instructor?.intro.length
                        : 60
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        setSeeMore({ ...seeMore, instructor: true });
                      }}
                    >
                      <TextContain style={{ color: "blue" }}>
                        {seeMore.instructor
                          ? ""
                          : languageModify(
                              "see more",
                              language.data?.getLanguage
                            )}
                      </TextContain>
                    </TouchableOpacity>
                  </TextContain>
                </InstructorDetail>
              </Instructor>
            </WrapContain>

            <WrapContain
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
                backgroundColor: themeModify("#ffff", theme.data?.getTheme),
              }}
            >
              <WrapContainHeader
                style={{
                  color: themeModify("#000", theme.data?.getTheme),
                }}
              >
                {languageModify("Requirement", language.data?.getLanguage)}
              </WrapContainHeader>
              <TextContain
                style={{
                  color: themeModify("#000", theme.data?.getTheme),
                }}
              >
                {data?.course?.requirement}
              </TextContain>
            </WrapContain>

            <SectionContain>
              <WrapContainHeader
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  color: themeModify("#000", theme.data?.getTheme),
                }}
              >
                {languageModify(
                  "What you will learn in this course",
                  language.data?.getLanguage
                )}
              </WrapContainHeader>
              {data?.course?.section.map((section, index) => {
                return (
                  <Section
                    key={index}
                    section={section}
                    stt={index + 1}
                    navigation={navigation}
                    categoryUrl={categoryUrl}
                    courseId={courseId}
                    isOwn={isOwn.data?.isOwn}
                  />
                );
              })}
              <Border
                style={{
                  backgroundColor: "#d4c9c9",
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                }}
              />
            </SectionContain>
            <SectionContain
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WrapContainHeader
                style={{
                  marginTop: 20,
                  marginBottom: 5,
                  color: themeModify("#000", theme.data?.getTheme),
                }}
              >
                {languageModify(
                  "Student also learn",
                  language.data?.getLanguage
                )}
              </WrapContainHeader>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30, height: 300 }}
                showsHorizontalScrollIndicator={false}
              >
                {!recommend.fetching
                  ? recommend.data?.courses.courses.map((card, index) => {
                      if (card.id === courseId) return null;
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
                    })
                  : null}
              </ScrollView>
            </SectionContain>

            <FeedBack
              courseId={courseId}
              courseRate={data?.course?.rateNumber}
            />
          </Content>
        </Container>
      </ScrollView>
    </Container>
  );
};

export default SectionScreen;

const FeedBackHasMore = styled.View`
  background-color: #c8c8c8;
  padding: 8px 16px;
  border-radius: 5px;
  margin-top: 15px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Border = styled.View`
  height: 1px;
  width: 500px;
  transform: translateX(-20px);
`;

const SectionContain = styled.View``;

const InstructorDetail = styled.View`
  flex-direction: column;
  width: 230px;
`;

const Instructor = styled.View`
  flex-direction: row;
`;

const InstructorAva = styled.Image`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const WrapContainHeader = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const WrapContain = styled.View`
  background-color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  margin-top: 15px;
`;

const TagIntro = styled.View`
  border: 1px #fff;
  flex-direction: row;
  padding: 5px 10px;
  border-radius: 5px;
  align-items: center;
  margin-right: 5px;
`;

const PayButton = styled.View`
  width: 250px;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
`;

const PayButtonText = styled.Text`
  color: #fff;
  text-transform: uppercase;
`;

const View = styled.View``;

const BestSellerImage = styled.Image`
  width: 70px;
  height: 30px;
`;

const Text = styled.Text`
  margin-right: 2px;
  color: #fff;
`;

const RateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Rate = styled.Text`
  font-size: 15px;
  color: #fff;
  margin: 0 5px;
`;

const IntroductionWrap = styled.View`
  width: 100%;
  position: absolute;
  top: 40px;
  left: 20px;
`;

const Marketing = styled.View`
  align-items: center;
`;

const TextContain = styled.Text`
  color: #000;
  font-size: 15px;
`;

const Content = styled.View`
  transform: translateY(-100px);
  padding: 20px;
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 250px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  /* background: white; */
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const PayButtonFixed = styled.View`
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  /* bottom: 0px; */
  z-index: 90;
`;

const AnimatedPayButton = Animated.createAnimatedComponent(PayButtonFixed);
