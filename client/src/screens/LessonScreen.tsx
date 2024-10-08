import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
// import { LinearGradient } from "expo";
import CourseSection from "../components/CourseSection";
import Courses from "../components/Favorites";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { HomeStackNavProps } from "../utils/params";
import {
  useGetLanguageQuery,
  useGetTrackLessonQuery,
  useLessonQuery,
  useTrackCourseMutation,
  useTrackLessonMutation,
} from "../generated/graphql";
import WebView from "react-native-webview";
import { ImageBackground } from "react-native";
import Overview from "../components/Overview";
import Forum from "../components/Forum";
import AssignmentScreen from "./AssignmentScreen";
import VideoRendering from "../components/VideoRendering";
import { languageModify } from "../utils/languageModify";

const LessonScreen = ({ route, navigation }: HomeStackNavProps<"Lesson">) => {
  const [language] = useGetLanguageQuery();
  const {
    courseId,
    lessonId,
    categoryUrl,
    week,
    lessonStt,
  }: any = route.params;
  const [{ data }] = useLessonQuery({
    variables: {
      lessonId,
    },
  });
  const [, trackCourse] = useTrackCourseMutation();

  const [track] = useGetTrackLessonQuery({
    variables: {
      lessonId,
    },
  });

  const [, trackLesson] = useTrackLessonMutation();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (track.data?.getTrackLesson) {
      setTime(track.data.getTrackLesson.time);
    }
  }, [track.data?.getTrackLesson]);

  useEffect(() => {
    trackCourse({
      courseId,
      lessonId,
    });
  }, [1]);

  console.log(track.data?.getTrackLesson);

  const [nav, setNav] = useState([
    {
      active: true,
      name: "Overview",
    },
    {
      active: false,
      name: "Grade",
    },
    {
      active: false,
      name: "Forum",
    },
    {
      active: false,
      name: "Assignments",
    },
  ]);

  return (
    <ImageBackground
      source={require("../assets/images/background12.jpg")}
      style={{ width: "100%" }}
    >
      <Contain>
        <View
          style={{
            height: 200,
          }}
        >
          <VideoRendering
            id={data?.lesson?.id}
            time={track.data?.getTrackLesson?.time}
            setTime={setTime}
            width={true}
            videoUrl={data?.lesson?.video}
          />
        </View>
        <ScrollViewNormal
          style={{
            flexDirection: "row",
            paddingBottom: 0,
            marginBottom: 0,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={async () => {
              await trackLesson({ lessonId, time });
              navigation.goBack();
            }}
          >
            <Tab>
              <Ionicons
                style={{ marginTop: 3 }}
                name="chevron-back"
                size={30}
                color="white"
              />
            </Tab>
          </TouchableOpacity>

          {nav.map(({ name, active }, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={() => {
                  setNav(
                    nav.map((navbar) => {
                      return name === navbar.name
                        ? { ...navbar, active: true }
                        : { ...navbar, active: false };
                    })
                  );
                }}
              >
                <Tab style={{ marginTop: 8 }}>
                  <TabText>
                    {languageModify(name, language.data?.getLanguage)}
                  </TabText>
                </Tab>
                {active ? (
                  <Border
                    style={{
                      backgroundColor: "#d4c9c9",
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                      width:
                        name === "Assignments"
                          ? 80
                          : name === "Overview"
                          ? 55
                          : 40,
                    }}
                  />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollViewNormal>

        {nav.map((navbar) =>
          navbar.active ? (
            navbar.name === "Overview" ? (
              <Overview
                categoryUrl={categoryUrl}
                week={week}
                lessonStt={lessonStt}
                lessonName={data?.lesson?.name}
                content={data?.lesson?.content}
                resources={data?.lesson?.resource}
              />
            ) : navbar.name === "Grade" ? (
              <Text>Grade</Text>
            ) : navbar.name === "Forum" ? (
              <Forum lessonId={lessonId} />
            ) : navbar.name === "Assignments" ? (
              // <ScrollView>
              // <Text>Hha</Text>
              <AssignmentScreen lessonId={data?.lesson?.id!} />
            ) : // </ScrollView>
            null
          ) : null
        )}
      </Contain>
    </ImageBackground>
  );
};

export default LessonScreen;

const Contain = styled.View`
  height: 100%;
  width: 100%;
`;

const Border = styled.View`
  height: 1px;
`;

const NavLesson = styled.View`
  flex-direction: row;
  width: 100%;
  height: 50px;
`;

const View = styled.View``;

const Text = styled.Text``;

const TabText = styled.Text`
  color: #fff;
`;

const Tab = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px 16px 8px 16px;
`;

const Container = styled.View`
  background: #f0f3f5;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const ScrollViewNormal = styled.ScrollView`
  height: 100px;
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
