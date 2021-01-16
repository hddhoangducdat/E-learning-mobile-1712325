import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {
  useFeedBacksQuery,
  useGetLanguageQuery,
  useGetThemeQuery,
} from "../generated/graphql";
import { languageModify } from "../utils/languageModify";
import { themeModify } from "../utils/themeModify";
import { useRate } from "../utils/useRate";

interface FeedBackProps {
  courseRate?: number;
  courseId: number;
}

export const FeedBack = ({ courseId, courseRate }: FeedBackProps) => {
  const [theme] = useGetThemeQuery();
  const [language] = useGetLanguageQuery();

  const [{ data }] = useFeedBacksQuery({
    variables: {
      courseId,
      limit: 5,
    },
  });

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
          color: themeModify("#000", theme.data?.getTheme),
        }}
      >
        {languageModify("Top review", language.data?.getLanguage)}
      </WrapContainHeader>
      <RateContainer>
        <Rate style={{ color: themeModify("#000", theme.data?.getTheme) }}>
          {courseRate ? courseRate / 2 : 0}
        </Rate>
        {useRate(courseRate ? courseRate / 2 : 0)}
      </RateContainer>
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
              backgroundColor: themeModify("#ffff", theme.data?.getTheme),
            }}
          >
            <Instructor>
              <InstructorAva source={{ uri: feed.user.avatar }} />
              <InstructorDetail>
                <TextContain
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    color: themeModify("#000", theme.data?.getTheme),
                  }}
                >
                  {feed.user.username}
                </TextContain>
                <TextContain
                  style={{
                    color: themeModify("#777373", theme.data?.getTheme),
                  }}
                >
                  {useRate(feed.rate / 2)}
                </TextContain>
                <TextContain
                  style={{
                    color: themeModify("#000", theme.data?.getTheme),
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
                color: themeModify("#fff", theme.data?.getTheme),
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

const FeedBackHasMore = styled.View`
  background-color: #c8c8c8;
  padding: 8px 16px;
  border-radius: 5px;
  margin-top: 15px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Border = styled.View`
  height: 1px;
  width: 500px;
  transform: translateX(-20px);
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

const PayButtonFixed = styled.View`
  height: 50px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  /* bottom: 0px; */
  z-index: 90;
`;
