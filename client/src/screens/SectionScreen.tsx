import React, { useEffect } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, StatusBar, ScrollView, Linking } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Markdown from "react-native-showdown";
import { HomeStackNavProps } from "../utils/params";
import { useDispatch } from "react-redux";
import { TRIGGER_TAB_BAR } from "../../types";
import WebView from "react-native-webview";

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

const SectionScreen = ({ navigation }: HomeStackNavProps<"Section">) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: TRIGGER_TAB_BAR });
    StatusBar.setBarStyle("light-content", true);
  });

  return (
    <ScrollView>
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={section.image} />
          <Wrapper>
            <Logo source={section.logo} />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: TRIGGER_TAB_BAR });
            navigation.goBack();
          }}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <CloseView
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 5,
            }}
          >
            <AntDesign
              name="close"
              size={20}
              color="#4775f2"
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {/* <WebView
            source={{ html: htmlContent + htmlStyles }}
            scalesPageToFit={false}
            scrollEnabled={false}
            // ref="webview"
            onNavigationStateChange={(event) => {
              console.log(event);

              if (event.url != "about:blank") {
                // this.refs.webview.stopLoading();
                // Linking.openURL(event.url);
              }
            }}
          /> */}
          {/* <Markdown
            markdown="Hello"
            body={section.content}
            pureCSS={htmlStyles}
            scalesPageToFit={false}
            scrollEnabled={false}
          /> */}
          <TextContain>{section.content}</TextContain>
        </Content>
      </Container>
    </ScrollView>
  );
};

export default SectionScreen;

const htmlContent = `
  <h2>This is a title</h2>
  <p>This <strong>is</strong> a <a href="http://designcode.io">link</a></p>
  <img src="https://cl.ly/c0b07504bfec/download/background4.jpg" />
`;

const htmlStyles = `
    * {
      font-family: -apple-system, Roboto;
      margin: 0;
      padding: 0;
      font-size: 17px;
      font-weight: normal;
      color: #3c4560;
      line-height: 24px;
    }

    h2 {
      font-size: 20px;
      text-transform: uppercase;
      color: #b8bece;
      font-weight: 600;
      margin-top: 50px;
    }
  
    p {
      margin-top: 20px;
    }
  
    a {
      color: #4775f2;
      font-weight: 600;
      text-decoration: none;
    }
  
    strong {
      font-weight: 700;
    }

    img {
      border-radius: 10px;
      margin-top: 20px;
    }

    pre {
      padding: 20px;
      background: #212C4F;
      overflow: hidden;
      word-wrap: break-word;
      border-radius: 10px;
      margin-top: 20px;
    }
    
    code {
      color: white;
    }
`;

const TextContain = styled.Text`
  color: #000;
  font-size: 15px;
`;

const Content = styled.View`
  /* height: 1000px; */
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
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
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
