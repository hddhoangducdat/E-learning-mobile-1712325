import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  useGetLanguageQuery,
  useGetThemeQuery,
  useLessonsQuery,
} from "../generated/graphql";
import { Animated } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { languageModify } from "../utils/languageModify";
import { themeModify } from "../utils/themeModify";

const Section = (props: any) => {
  const [theme] = useGetThemeQuery();
  const [language] = useGetLanguageQuery();
  const [open, setOpen] = useState("close");
  const height = useRef(new Animated.Value(0)).current;
  const [{ data }] = useLessonsQuery({
    variables: {
      sectionId: props.section.id,
    },
  });

  useEffect(() => {
    toggleMenu();
  }, [open]);

  const toggleMenu = () => {
    if (open === "open") {
      Animated.timing(height, {
        toValue: 10000,
        duration: 4000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration: 4000,
        useNativeDriver: false,
      }).start();
    }
  };

  const msToTime = (duration: number) => {
    var milliseconds = (duration % 1000) / 100,
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const tmp2 = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + tmp2;
  };

  return (
    <Container>
      <Border
        style={{
          backgroundColor: "#d4c9c9",
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />
      <TouchableOpacity
        onPress={() => setOpen(open === "open" ? "close" : "open")}
      >
        <SectionWrap>
          <Week>
            {languageModify("Week", language.data?.getLanguage)}
            {" " + props.stt}
          </Week>
          <Text
            style={{
              color: themeModify("#000", theme.data?.getTheme),
            }}
          >
            {props.section.name}
          </Text>
          {open === "close" ? (
            <Ionicons
              style={{
                position: "absolute",
                right: 0,
                top: 16,
              }}
              name="md-arrow-dropdown"
              size={24}
              color="#817676"
            />
          ) : (
            <Ionicons
              style={{
                position: "absolute",
                right: 0,
                top: 16,
              }}
              name="md-arrow-dropup"
              size={24}
              color="#817676"
            />
          )}
        </SectionWrap>
      </TouchableOpacity>
      <AnimatedContainer style={{ maxHeight: height }}>
        {open === "open"
          ? data?.lessons.map((lesson, index) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.push("Lesson", {
                    lessonId: lesson.id,
                    categoryUrl: props.categoryUrl,
                    week: props.stt,
                    lessonStt: index + 1,
                  })
                }
              >
                <LessonWrap>
                  <LessonOrder
                    style={{
                      color: themeModify("#000", theme.data?.getTheme),
                    }}
                  >
                    {index + 1}
                  </LessonOrder>
                  <LessonDetail>
                    <LessonName
                      style={{
                        color: themeModify("#000", theme.data?.getTheme),
                      }}
                    >
                      {lesson.name}
                    </LessonName>
                    <TagIntro>
                      <Entypo
                        name="back-in-time"
                        size={10}
                        color={themeModify("#000", theme.data?.getTheme)}
                      />
                      <Text
                        style={{
                          color: themeModify("#000", theme.data?.getTheme),
                          fontSize: 10,
                          marginLeft: 5,
                        }}
                      >
                        {msToTime(lesson.times) + " hours"}
                      </Text>
                    </TagIntro>
                  </LessonDetail>
                </LessonWrap>
              </TouchableOpacity>
            ))
          : null}
      </AnimatedContainer>
    </Container>
  );
};

const TagIntro = styled.View`
  flex-direction: row;
  align-items: center;
  /* margin-bottom: 5px; */
`;

const Lesson = styled.View``;

const AnimatedContainer = Animated.createAnimatedComponent(Lesson);

const LessonName = styled.Text`
  font-weight: 600;
  font-size: 17px;
`;

const LessonTime = styled.Text``;

const Border = styled.View`
  height: 1px;
  width: 500px;
  transform: translateX(-20px);
`;

const Week = styled.Text`
  font-weight: 600;
  font-size: 17px;
  color: #6d6a6a;
  text-transform: uppercase;
`;

const SectionWrap = styled.View`
  padding: 16px 0px;
  flex-direction: row;
`;

const Container = styled.View`
  /* height: 60px; */
  border-radius: 10px;
  flex-direction: column;
  /* align-items: center; */
`;

const LessonOrder = styled.Text`
  margin-top: 1px;
  margin-right: 30px;
  font-weight: 700;
`;

const LessonDetail = styled.View`
  flex-direction: column;
`;

const LessonContent = styled.Text``;

const LessonWrap = styled.View`
  margin-left: 54px;
  margin-bottom: 16px;
  flex-direction: row;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 30px;
`;

export default Section;
