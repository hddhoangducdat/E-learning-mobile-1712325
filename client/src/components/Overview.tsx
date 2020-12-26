import React from "react";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Resource } from "../generated/graphql";

interface OverviewProps {
  categoryUrl: string;
  week: number;
  lessonStt: number;
  lessonName?: string;
  content?: string;
  resources?: Array<
    { __typename?: "Resource" } & Pick<Resource, "id" | "name" | "url" | "type">
  >;
}

const Overview = ({
  categoryUrl,
  lessonStt,
  week,
  lessonName,
  content,
  resources,
}: OverviewProps) => (
  <ScrollView>
    <Container>
      <Logo source={{ uri: categoryUrl }} />
      <Caption>
        Week {week} / Lesson {lessonStt}
      </Caption>
      <Title>{lessonName}</Title>
      <Content>{content}</Content>

      <Caption>Resources</Caption>
      <View>
        {resources?.map((resource) => {
          return (
            <TouchableOpacity
              key={resource.id}
              onPress={() => Linking.openURL(resource.url)}
            >
              <Url
              //   style={{
              //     width: resource.name.length,
              //   }}
              >
                {resource.name}
              </Url>
            </TouchableOpacity>
          );
        })}
      </View>
    </Container>
  </ScrollView>
);

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
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
  color: white;
  padding: 8px 20px;
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

const Image = styled.Image``;

const Text = styled.Text``;

export default Overview;
