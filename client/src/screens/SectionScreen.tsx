import React, { useEffect } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, StatusBar, ScrollView, Linking } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Markdown from "react-native-showdown";
import { HomeStackNavProps } from "../utils/params";
import { useDispatch } from "react-redux";
import { TRIGGER_TAB_BAR } from "../../types";
import WebView from "react-native-webview";
import { useCourseQuery } from "../generated/graphql";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

interface SectionScreenProps {}

const section = {
  title: "React Native for Designers",
  image: require("../assets/images/background3.jpg"),
  subtitle: "React Native",
  caption: "1 of 12 sections",
  logo: require("../assets/images/logo-react.png"),
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non efficitur lectus, a tristique tortor. Sed et lacinia purus. Vivamus quam nisi, aliquet ut congue vel, vehicula et diam. Phasellus volutpat felis dapibus convallis pretium. Nam condimentum, augue sed feugiat finibus, felis justo luctus odio, id convallis augue leo vel lacus. Aenean ultricies fringilla velit in maximus. In sed felis non erat bibendum tempor. Phasellus dignissim libero quis elit facilisis porta ac a sem. Quisque dictum consequat placerat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non efficitur lectus, a tristique tortor. Sed et lacinia purus. Vivamus quam nisi, aliquet ut congue vel, vehicula et diam. Phasellus volutpat felis dapibus convallis pretium. Nam condimentum, augue sed feugiat finibus, felis justo luctus odio, id convallis augue leo vel lacus. Aenean ultricies fringilla velit in maximus. In sed felis non erat bibendum tempor. Phasellus dignissim libero quis elit facilisis porta ac a sem. Quisque dictum consequat placerat.",
};

const SectionScreen = ({ route, navigation }: HomeStackNavProps<"Section">) => {
  const {
    courseId,
    categoryUrl,
    isBestSeller,
    categoryName,
  }: any = route.params;
  const [{ data }] = useCourseQuery({
    variables: {
      id: courseId,
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: TRIGGER_TAB_BAR });
    StatusBar.setBarStyle("light-content", true);
  });

  const rate = () => {
    let arr = [];
    for (let i = 0; i < Math.floor(data?.course?.rateNumber!); i++) {
      arr.push("star");
    }
    if (data?.course?.rateNumber! > Math.floor(data?.course?.rateNumber!)) {
      arr.push("star-half-empty");
    }
    while (arr.length < 5) {
      arr.push("star-o");
    }

    return arr.map((star) => (
      <FontAwesome name={star} size={15} color="#f2b20f" />
    ));
  };

  const msToTime = (duration: number) => {
    var milliseconds = (duration % 1000) / 100,
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const tmp2 = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + tmp2;
  };

  return (
    <ScrollView>
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={section.image} />
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
              {rate()}
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
                  {msToTime(data?.course?.totalHours!) + " total hours"}
                </Text>
              </TagIntro>
            </RateContainer>
            <RateContainer></RateContainer>
          </IntroductionWrap>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: TRIGGER_TAB_BAR });
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

          <TextContain>{}</TextContain>
        </Content>
      </Container>
    </ScrollView>
  );
};

export default SectionScreen;

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
