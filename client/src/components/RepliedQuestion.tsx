import React from "react";
import { Linking } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useReplyQuestionsQuery } from "../generated/graphql";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { QuestionProps } from "./Forum";
import { Fontisto } from "@expo/vector-icons";

const RepliedQuestion = (question: QuestionProps) => {
  const [{ data }] = useReplyQuestionsQuery({
    variables: {
      limit: 10,
      questionId: question.repliedId,
    },
  });

  return (
    <Container>
      <View>
        <User>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar source={{ uri: question.avatar }} />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Username>{question.username}</Username>

            <ViewNormal>
              <AntDesign name="heart" size={13} color="#b6b5b5" />
              <Text style={{ marginLeft: 5, marginRight: 30 }}>
                {question.vote}
              </Text>
              <Entypo name="reply" size={18} color="#b6b5b5" />
              <Text style={{ marginLeft: 5, marginRight: 30 }}>
                {question.share}
              </Text>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => question.setOpen(null)}
              >
                <Fontisto name="origin" size={18} color="#ff8800" />
                <Text style={{ marginLeft: 5, marginRight: 30 }}>reset</Text>
              </TouchableOpacity>
            </ViewNormal>
          </View>
        </User>
        <ContentReplied
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
        </ContentReplied>
      </View>

      {data?.replyQuestions.questions.map(
        ({ content, id, repliedNumber, user, votedNumber }) => {
          return (
            <View key={id}>
              <TouchableOpacity
                onPress={() =>
                  question.setOpen({
                    avatar: user.avatar,
                    content: content,
                    repliedId: id,
                    share: repliedNumber,
                    username: user.username,
                    vote: votedNumber,
                    setOpen: question.setOpen,
                  })
                }
              >
                <User>
                  <Avatar source={{ uri: user.avatar }} />
                  <View style={{ flexDirection: "column" }}>
                    <Username>{user.username}</Username>
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
                        {votedNumber}
                      </Text>
                      <Entypo name="reply" size={18} color="#b6b5b5" />
                      <Text style={{ marginLeft: 5, marginRight: 30 }}>
                        {repliedNumber}
                      </Text>
                    </View>
                  </View>
                </User>
              </TouchableOpacity>
            </View>
          );
        }
      )}
    </Container>
  );
};

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

const ContentReplied = styled.Text`
  font-size: 15px;
  background-color: #fff;
  color: #000;
  margin-top: 5px;
  border-radius: 10px;
  width: 100%;
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

const Container = styled.View``;

const View = styled.View`
  padding: 8px 16px;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ViewNormal = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`;

const Image = styled.Image``;

const Text = styled.Text`
  color: #fff;
`;

export default RepliedQuestion;
