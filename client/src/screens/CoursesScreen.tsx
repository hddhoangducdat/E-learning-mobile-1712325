import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
// import { LinearGradient } from "expo";
import CourseSection from "../components/CourseSection";
import Courses from "../components/Courses";
import { AsyncStorage, Dimensions } from "react-native";
import { Video } from "expo-av";

interface CoursesScreenProps {}

const navigationOptions = { title: "Courses", header: null };
let screenWidth = Dimensions.get("window").width;

const CoursesScreen = ({}) => {
  const [downloaded, setDownloaded] = useState<any[]>([]);
  useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      setDownloaded(
        keys.map(async (key) => {
          const data = await AsyncStorage.getItem(key);
          if (data) {
            return data;
          }
        })
      );
    });
  }, []);

  return (
    <Container>
      <ScrollView>
        <Hero>
          <Background source={require("../assets/images/background12.jpg")} />
          {/* <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
            style={{ position: "absolute", width: screenWidth, height: 460 }}
          /> */}
          <Logo source={require("../assets/images/logo-react.png")} />
          <Caption>12 Sections</Caption>
          <Title>React Native for Designers</Title>
          <Sections>
            <SectionScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {sections.map((section, index) => (
                <CourseSection
                  key={index}
                  title={section.title}
                  image={section.image}
                  progress={section.progress}
                />
              ))}
            </SectionScrollView>
          </Sections>
          <Author>
            <Avatar source={require("../assets/images/avatar.jpg")} />
            <Name>Taught by Meng To</Name>
          </Author>
        </Hero>
        <Subtitle>Latest Courses</Subtitle>
        {downloaded.map(({ fileUri }, id) => {
          console.log(fileUri);
          return (
            <Video
              key={id}
              source={{
                uri: fileUri,
              }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={false}
              isLooping={false}
              useNativeControls
              style={{ width: 250, height: 150 }}
            />
          );
        })}

        <Courses />
      </ScrollView>
    </Container>
  );
};

export default CoursesScreen;

const Container = styled.View`
  background: #f0f3f5;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Hero = styled.View`
  height: 460px;
  background: #3c4560;
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: ${screenWidth};
  height: 460px;
`;

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  margin-top: 50px;
  margin-left: 20px;
  align-self: center;
`;

const Caption = styled.Text`
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  color: #b8bece;
  margin-top: 20px;
  margin-left: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: 600;
  margin-top: 4px;
  margin-left: 20px;
  width: 220px;
`;

const Sections = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const SectionScrollView = styled.ScrollView`
  padding: 10px 0;
`;

const Author = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  margin-left: 20px;
`;

const Avatar = styled.Image`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background: white;
`;

const Name = styled.Text`
  margin-left: 8px;
  color: #b8bece;
`;

const Subtitle = styled.Text`
  font-size: 15;
  text-transform: uppercase;
  font-weight: 600;
  color: #b8bece;
  margin: 20px 0 0 20px;
`;

const sections = [
  {
    title: "React Native for Designers",
    progress: 0.2,
    image: require("../assets/images/background1.jpg"),
  },
  {
    title: "Styled Components",
    progress: 0.3,
    image: require("../assets/images/background2.jpg"),
  },
  {
    title: "Assets, Icons and SVG",
    progress: 0.9,
    image: require("../assets/images/background3.jpg"),
  },
  {
    title: "Props and Data",
    progress: 0.5,
    image: require("../assets/images/background4.jpg"),
  },
  {
    title: "States and Layout Animation",
    progress: 0.1,
    image: require("../assets/images/background6.jpg"),
  },
];
