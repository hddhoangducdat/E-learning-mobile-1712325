import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
// import { LinearGradient } from "expo";
import CourseSection from "../components/CourseSection";
import { AsyncStorage, Dimensions } from "react-native";
import { Video } from "expo-av";
import {
  useGetThemeQuery,
  useMeQuery,
  useMyCourseQuery,
} from "../generated/graphql";
import LottieView from "lottie-react-native";
import { themeModify } from "../utils/themeModify";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppBottomTabProps } from "../utils/params";

let screenWidth = Dimensions.get("window").width;

const CoursesScreen = ({ route, navigation }: AppBottomTabProps<"Courses">) => {
  const [{ data }] = useMyCourseQuery();
  const [me] = useMeQuery();
  const [downloaded, setDownloaded] = useState<any[]>([]);
  const [theme] = useGetThemeQuery();

  useEffect(() => {
    getAllVideoLink().then((result: any) => {
      setDownloaded(result);
    });
  }, []);

  const getAllVideoLink = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      return result.map((req: any) => {
        try {
          const object = JSON.parse(req[1]);
          if (object.fileUri) {
            return object.fileUri;
          }
        } catch (err) {}
        return "";
      });
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(downloaded);
  if (!me.data?.me)
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LottieView
          style={{
            width: 400,
            height: 400,
          }}
          autoPlay
          loop
          source={require("../assets/json/3944-voce-ganhou.json")}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        <Title
          style={{
            width: 200,
            color: themeModify("#000", theme.data?.getTheme),
          }}
        >
          You haven't logged in yet
        </Title>
      </View>
    );

  return (
    <Container>
      <Hero>
        <Background source={require("../assets/images/background12.jpg")} />
        {/* <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
            style={{ position: "absolute", width: screenWidth, height: 460 }}
          /> */}
        <Title style={{ marginTop: 50 }}>My Courses</Title>
        <Sections>
          <SectionScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {data?.myCourse
              ? data?.myCourse.map((course, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("Section", {
                        courseId: course.id,
                        categoryUrl: course.category.imageUrl,
                        categoryId: course.category.id,
                        categoryName: course.category.name,
                        isBestSeller: false,
                      } as any);
                    }}
                  >
                    <CourseSection
                      id={course.id}
                      title={course.title}
                      image={course.imageUrl}
                    />
                  </TouchableOpacity>
                ))
              : null}
          </SectionScrollView>
        </Sections>
        <Author>
          <Avatar source={{ uri: me.data?.me?.avatar }} />
          <Name>{me.data.me.username}</Name>
        </Author>
        <Subtitle>Donwloaded Courses</Subtitle>
        <View>
          {downloaded.map((fileUri, id) => {
            if (fileUri === "") return null;
            // console.log(fileUri);
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
                style={{ width: "100%", height: 200 }}
              />
            );
          })}
        </View>
      </Hero>
    </Container>
  );
};

export default CoursesScreen;

const View = styled.View`
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  background: #f0f5ff;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Hero = styled.ScrollView`
  height: 100%;
  background: #3c4560;
`;

const Background = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: ${screenWidth};
  height: 100%;
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
  color: #fff;
  font-size: 32px;
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
  margin: 20px;
`;
