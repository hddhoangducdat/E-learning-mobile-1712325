import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled, { DefaultTheme } from "styled-components/native";
import {
  useFeedBacksQuery,
  useGetLanguageQuery,
  useGetThemeQuery,
  useMeQuery,
  useWriteFeedBackMutation,
} from "../generated/graphql";
import { languageModify } from "../utils/languageModify";
import { themeModify } from "../utils/themeModify";
import { useRate } from "../utils/useRate";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

interface FeedBackProps {
  courseRate?: number;
  courseId: number;
}

export const FeedBack = ({ courseId, courseRate }: FeedBackProps) => {
  const [color] = useGetThemeQuery();
  const [language] = useGetLanguageQuery();

  const [{ data }] = useFeedBacksQuery({
    variables: {
      courseId,
      limit: 5,
    },
  });

  const [text, setText] = useState("");

  const theme: DefaultTheme = {
    input: {
      background: themeModify("#fffefc", color.data?.getTheme),
      color: themeModify("#5d5d5d", color.data?.getTheme),
    },
  };

  const [rate, setRate] = useState(0);

  const [, writeFeedBack] = useWriteFeedBackMutation();

  const [me] = useMeQuery();

  return (
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
          color: themeModify("#000", color.data?.getTheme),
        }}
      >
        {languageModify("Top review", language.data?.getLanguage)}
      </WrapContainHeader>
      <RateContainer>
        <Rate style={{ color: themeModify("#000", color.data?.getTheme) }}>
          {courseRate ? courseRate / 2 : 0}
        </Rate>
        {useRate(courseRate ? courseRate / 2 : 0)}
      </RateContainer>
      <View style={{ width: "100%", position: "relative" }}>
        <View style={{ width: "100%", zIndex: -1 }}>
          <TextField
            theme={theme}
            multiline
            style={{
              shadowColor: themeModify("#000", color.data?.getTheme),
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            }}
            placeholderTextColor={themeModify("#000", color.data?.getTheme)}
            onChangeText={(output: any) => setText(output)}
            value={text}
            placeholder="Write your feedback"
            onSubmitEditing={() => {}}
          ></TextField>
        </View>
        <View
          style={{
            position: "absolute",
            top: 27,
            left: 25,
          }}
        >
          <Avatar source={{ uri: me.data?.me?.avatar }} />
        </View>
        <Close
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
          onPress={() => setText("")}
        >
          <AntDesign name="closecircle" size={24} color="white" />
        </Close>
        <Touch
          style={{
            position: "absolute",
            top: 27,
            right: 15,
          }}
          onPress={async () => {
            if (text.trim() !== "") {
              const response = await writeFeedBack({
                courseId,
                rate,
                content: text.trim(),
              });
              console.log(response);
              setText("");
            } else {
              setText(text.trim());
            }
          }}
        >
          <MaterialIcons name="send" size={23} color="#1a9dee" />
        </Touch>
        <View
          style={{
            position: "absolute",
            top: 60,
            left: 30,
            flowDirection: "column",
          }}
        >
          {useRate(rate, setRate)}
        </View>
      </View>
      {data?.feedBacks.feedBacks.map((feed) => {
        return (
          <WrapContain
            key={feed.id}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 3,
              backgroundColor: themeModify("#ffff", color.data?.getTheme),
            }}
          >
            <Instructor>
              <InstructorAva source={{ uri: feed.user.avatar }} />
              <InstructorDetail>
                <TextContain
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    color: themeModify("#000", color.data?.getTheme),
                  }}
                >
                  {feed.user.username}
                </TextContain>
                <TextContain
                  style={{
                    color: themeModify("#777373", color.data?.getTheme),
                  }}
                >
                  {useRate(feed.rate / 2)}
                </TextContain>
                <TextContain
                  style={{
                    color: themeModify("#000", color.data?.getTheme),
                  }}
                >
                  {feed.content}
                </TextContain>
              </InstructorDetail>
            </Instructor>
          </WrapContain>
        );
      })}
      {data?.feedBacks.hasMore ? (
        <TouchableOpacity style={{ width: "100%" }} onPress={() => {}}>
          <FeedBackHasMore>
            <Text
              style={{
                color: themeModify("#fff", color.data?.getTheme),
                fontSize: 20,
              }}
            >
              See more
            </Text>
          </FeedBackHasMore>
        </TouchableOpacity>
      ) : null}
    </SectionContain>
  );
};

const Touch = styled.TouchableOpacity``;
const Close = styled.TouchableOpacity`
  transform: translate(9px, -2px);
`;

const Avatar = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

const TextField = styled.TextInput`
  height: 150px;
  margin-top: 10px;
  padding: 0px 50px 15px 74px;
  font-size: 15px;
  /* max-height: 150px; */
  width: 100%;
  background-color: ${(props: any) => props.theme.input.background};
  color: ${(props: any) => props.theme.input.color};
`;

const FeedBackHasMore = styled.View`
  background-color: #c8c8c8;
  padding: 8px 16px;
  border-radius: 5px;
  margin-top: 15px;
  height: 50px;
  align-items: center;
  justify-content: center;
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

const View = styled.View``;

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

const TextContain = styled.Text`
  color: #000;
  font-size: 15px;
`;
