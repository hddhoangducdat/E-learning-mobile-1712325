import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import Course from "../components/Course";
import { NotificationIcon } from "../components/Icon";
import Logo from "../components/Logo";

export default function Login({}) {
  return (
    <Container>
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }}>
          <TitleBar>
            <Avatar source={require("../assets/images/avatar.jpg")} />
            <Title>Welcome back,</Title>
            <Name>Dat</Name>
            <NotificationIcon
              style={{ position: "absolute", right: 20, top: 5 }}
            />
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
            style={{ padddingBottom: 30 }}
            showsHorizontalScrollIndicator={false}
          >
            {cards.map((card, index) => {
              return (
                <Card
                  key={index}
                  title={card.title}
                  image={card.image}
                  caption={card.caption}
                  logo={card.logo}
                  subtitle={card.subtitle}
                />
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
    </Container>
  );
}

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
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Container = styled.View`
  background: #f0f3f5;
  flex: 1;
`;

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
