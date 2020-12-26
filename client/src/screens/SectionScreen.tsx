import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import {
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Linking,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Markdown from "react-native-showdown";
import { HomeStackNavProps } from "../utils/params";
import { useDispatch } from "react-redux";
import { TRIGGER_TAB_BAR } from "../../types";
import WebView from "react-native-webview";
import {
  useFeedBacksQuery,
  useCourseQuery,
  useInstructorQuery,
} from "../generated/graphql";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Section from "../components/Section";
import { timeCalc } from "../utils/timeCalc";

interface SectionScreenProps {}

const SectionScreen = ({ route, navigation }: HomeStackNavProps<"Section">) => {
  const {
    courseId,
    categoryUrl,
    isBestSeller,
    categoryName,
  }: any = route.params;

  const [feedBacks] = useFeedBacksQuery({
    variables: {
      courseId,
      limit: 5,
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

  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
  }

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

  const rate = (rateNumber: number) => {
    let arr = [];
    for (let i = 0; i < Math.floor(rateNumber); i++) {
      arr.push("star");
    }
    if (rateNumber > Math.floor(rateNumber)) {
      arr.push("star-half-empty");
    }
    while (arr.length < 5) {
      arr.push("star-o");
    }

    return arr.map((star, t) => (
      <FontAwesome key={t} name={star} size={15} color="#f2b20f" />
    ));
  };

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

  return (
    <Container>
      <AnimatedPayButton style={{ bottom }}>
        <PayButtonText>Buy Now - {data?.course?.price}</PayButtonText>
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
        <Container>
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
                {rate(data?.course?.rateNumber! / 2)}
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
              <WebView
                style={{ width: 250, height: 150, backgroundColor: "black" }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{
                  html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/v2LJb0fJhqk?list=RDWCCp0zbnR50" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>`,
                }}
              />
              <TouchableOpacity>
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
                  }}
                >
                  <PayButtonText>Buy Now - {data?.course?.price}</PayButtonText>
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
              }}
            >
              <WrapContainHeader>About this course</WrapContainHeader>
              <TextContain>
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
                    {seeMore.description ? "" : " see more"}
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
              }}
            >
              <WrapContainHeader>Skills you will gains</WrapContainHeader>
              <TextContain>{data?.course?.learnWhat}</TextContain>
            </WrapContain>

            <WrapContain
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <WrapContainHeader>Instructors</WrapContainHeader>
              <Instructor>
                <InstructorAva
                  source={{ uri: instructor.data?.instructor.avatar }}
                />
                <InstructorDetail>
                  <TextContain style={{ fontWeight: "700", fontSize: 18 }}>
                    {instructor.data?.instructor.username}
                  </TextContain>
                  <TextContain style={{ color: "#777373" }}>
                    {instructor.data?.instructor.instructor?.major}
                  </TextContain>
                  <TextContain>
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
                        {seeMore.instructor ? "" : " see more"}
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
              }}
            >
              <WrapContainHeader>Requirement</WrapContainHeader>
              <TextContain>{data?.course?.requirement}</TextContain>
            </WrapContain>

            <SectionContain>
              <WrapContainHeader
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                What you will learn in this course
              </WrapContainHeader>
              {data?.course?.section.map((section, index) => {
                return (
                  <Section
                    key={index}
                    section={section}
                    stt={index + 1}
                    navigation={navigation}
                    categoryUrl={categoryUrl}
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
                }}
              >
                Top review
              </WrapContainHeader>
              <RateContainer>
                <Rate style={{ color: "#000" }}>
                  {data?.course?.rateNumber! / 2}
                </Rate>
                {rate(data?.course?.rateNumber! / 2)}
              </RateContainer>
              {feedBacks.data?.feedBacks.feedBacks.map((feed) => {
                return (
                  <WrapContain
                    key={feed.id}
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                      elevation: 3,
                    }}
                  >
                    <Instructor>
                      <InstructorAva source={{ uri: feed.user.avatar }} />
                      <InstructorDetail>
                        <TextContain
                          style={{ fontWeight: "700", fontSize: 18 }}
                        >
                          {feed.user.username}
                        </TextContain>
                        <TextContain style={{ color: "#777373" }}>
                          {rate(feed.rate / 2)}
                        </TextContain>
                        <TextContain>{feed.content}</TextContain>
                      </InstructorDetail>
                    </Instructor>
                  </WrapContain>
                );
              })}
              {feedBacks.data?.feedBacks.hasMore ? (
                <TouchableOpacity style={{ width: "100%" }} onPress={() => {}}>
                  <FeedBackHasMore>
                    <Text style={{ fontSize: 20 }}>See more</Text>
                  </FeedBackHasMore>
                </TouchableOpacity>
              ) : null}
            </SectionContain>
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
  background-color: red;
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
  background-color: red;
`;

const AnimatedPayButton = Animated.createAnimatedComponent(PayButtonFixed);
