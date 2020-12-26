import React, { useState } from "react";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Resource, useQuestionsQuery } from "../generated/graphql";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import RepliedQuestion from "./RepliedQuestion";

interface ForumProps {
  lessonId: number;
}

export interface QuestionProps {
  avatar: string;
  username: string;
  vote: number;
  content: string;
  share: number;
  repliedId: number;
  setOpen: React.Dispatch<React.SetStateAction<QuestionProps | null>>;
}

const Forum = ({ lessonId }: ForumProps) => {
  const [{ data }] = useQuestionsQuery({
    variables: {
      limit: 10,
      lessonId,
    },
  });

  const [open, setOpen] = useState<QuestionProps | null>(null);
  const [text, setText] = useState("");

  return (
    <>
      <InputView
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <ChatInput
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            // elevation: 10,
          }}
          placeholder="Q&A section"
          onChangeText={(result: any) => setText(result)}
          defaultValue={text}
        />
        <InputView
          style={{
            zIndex: 2000,
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChatButton>
            <Entypo name="google-play" size={24} color="#0717ff" />
          </ChatButton>
        </InputView>
      </InputView>
      <ScrollView>
        <Container>
          {open ? (
            <RepliedQuestion
              avatar={open.avatar}
              content={open.content}
              repliedId={open.repliedId}
              share={open.share}
              vote={open.vote}
              username={open.username}
              setOpen={setOpen}
            />
          ) : (
            data?.questions.questions.map((question) => {
              return (
                <View key={question.id}>
                  <TouchableOpacity
                    onPress={() =>
                      setOpen({
                        avatar: question.user.avatar,
                        content: question.content,
                        repliedId: question.id,
                        setOpen,
                        share: question.repliedNumber,
                        username: question.user.username,
                        vote: question.votedNumber,
                      })
                    }
                  >
                    <User>
                      <Avatar source={{ uri: question.user.avatar }} />
                      <View style={{ flexDirection: "column" }}>
                        <Username>{question.user.username}</Username>
                        <Content
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
                          {question.content}
                        </Content>
                        <View
                          style={{
                            alignItems: "center",
                          }}
                        >
                          <AntDesign name="heart" size={13} color="#b6b5b5" />
                          <Text style={{ marginLeft: 5, marginRight: 30 }}>
                            {question.votedNumber}
                          </Text>
                          <Entypo name="reply" size={18} color="#b6b5b5" />
                          <Text style={{ marginLeft: 5, marginRight: 30 }}>
                            {question.repliedNumber}
                          </Text>
                        </View>
                      </View>
                    </User>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </Container>
      </ScrollView>
    </>
  );
};

const ChatInput = styled.TextInput`
  height: 50px;
  width: 85%;
  background-color: #fff;
  color: #5d5d5d;
  padding: 8px 16px;
`;

const Username = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 18px;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const User = styled.View`
  flex-direction: row;
`;

const Url = styled.Text`
  font-size: 15px;
  color: #ec4141;
  padding: 0px 20px;
  margin: 0px 0px 5px 5px;
  border: 1px #ec4141;
  border-radius: 20px;
`;

const Content = styled.Text`
  font-size: 15px;
  background-color: #fff;
  color: #000;
  margin-top: 5px;
  border-radius: 10px;
  width: 240px;
  padding: 20px;
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
  margin-bottom: 20px;
  margin-left: 20px;
  width: 220px;
`;

const Logo = styled.Image`
  width: 60px;
  height: 60px;
  margin-top: 50px;
  margin-bottom: 20px;
  align-self: center;
  justify-content: center;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Container = styled.View`
  margin-top: 20px;
  padding: 0px 16px;
`;

const View = styled.View`
  padding: 8px 16px;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

const InputView = styled.View``;

const Image = styled.Image``;

const Text = styled.Text`
  color: #fff;
`;

const ChatButton = styled.View`
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export default Forum;
