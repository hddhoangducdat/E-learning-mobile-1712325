import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import Project from "../components/Project";
import {
  PanResponder,
  Animated,
  PanResponderInstance,
  PanResponderGestureState,
} from "react-native";
import { getNextIndex } from "../utils/getNextIndex";
import { useSelector } from "react-redux";
import { ReduxReducers } from "../../types";
import Assignment from "../components/Assignment";
import { useAssignmentsQuery } from "../generated/graphql";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

interface ProjectsScreenProps {
  lessonId: number;
}

const AssignmentScreen: React.FC<ProjectsScreenProps> = ({ lessonId }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  const thirdScale = useRef(new Animated.Value(0.8)).current;
  const thirdTranslateY = useRef(new Animated.Value(-50)).current;
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;

  const [panResponder, setPanResponder] = useState<PanResponderInstance>();

  const { openProject } = useSelector((state: ReduxReducers) => {
    return state;
  });

  const [{ data }] = useAssignmentsQuery({
    variables: {
      lessonId,
    },
  });

  useEffect(() => {
    setPanResponder(
      PanResponder.create({
        onMoveShouldSetPanResponder: (
          _,
          gestureState: PanResponderGestureState
        ) => {
          if (gestureState.dx === 0 && gestureState.dy === 0) {
            return false;
          } else {
            return !openProject;
          }
        },
        onPanResponderGrant: () => {
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          Animated.spring(thirdScale, {
            toValue: 0.9,
            useNativeDriver: false,
          }).start();
          Animated.spring(thirdTranslateY, {
            toValue: 44,
            useNativeDriver: false,
          }).start();
          Animated.timing(opacity, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
        onPanResponderRelease: () => {
          Animated.timing(opacity, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          if ((pan.y as any)._value > 200) {
            Animated.timing(pan, {
              toValue: { x: 0, y: 1000 },
              useNativeDriver: false,
            }).start(() => {
              pan.setValue({ x: 0, y: 0 });
              scale.setValue(0.9);
              translateY.setValue(44);
              thirdScale.setValue(0.8);
              thirdTranslateY.setValue(-50);
              setIndex(
                getNextIndex(
                  index,
                  data?.assignments ? data.assignments.length : 0
                )
              );
            });
          } else {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();

            Animated.spring(scale, {
              toValue: 0.9,
              useNativeDriver: false,
            }).start();

            Animated.spring(translateY, {
              toValue: 44,
              useNativeDriver: false,
            }).start();

            Animated.spring(thirdScale, {
              toValue: 0.8,
              useNativeDriver: false,
            }).start();
            Animated.spring(thirdTranslateY, {
              toValue: -50,
              useNativeDriver: false,
            }).start();
          }
        },
      })
    );
  }, [index, openProject]);

  const [solve, setSolve] = useState<string[] | null>(null);

  useEffect(() => {
    if (data?.assignments && !solve) {
      setSolve(
        data?.assignments.map((assignment) => {
          return assignment.question
            ? assignment.question[0].content
            : assignment.type === "TEXT"
            ? ""
            : assignment.code;
        })
      );
    }
  }, [data?.assignments.length]);

  return (
    <>
      <SubmitButtonFixed>
        <TouchableOpacity>
          <Entypo name="rdio" size={24} color="#fff" />
        </TouchableOpacity>
      </SubmitButtonFixed>
      <ScrollView>
        <Container>
          <AnimatedMask style={{ opacity }} />
          <Animated.View
            style={{
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            }}
            {...panResponder?.panHandlers}
          >
            <Assignment
              title={data?.assignments[index].title}
              image={projects[index % 3].image}
              code={data?.assignments[index].code}
              time={data?.assignments[index].time}
              type={data?.assignments[index].type}
              question={data?.assignments[index].question}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              transform: [{ scale }, { translateY }],
            }}
          >
            <Assignment
              title={
                data?.assignments[getNextIndex(index, data.assignments.length)]
                  .title
              }
              image={
                projects[
                  getNextIndex(
                    index,
                    data?.assignments ? data.assignments.length : 0
                  ) % 3
                ].image
              }
              code={
                data?.assignments[getNextIndex(index, data.assignments.length)]
                  .code
              }
              time={
                data?.assignments[getNextIndex(index, data.assignments.length)]
                  .time
              }
              type={
                data?.assignments[getNextIndex(index, data.assignments.length)]
                  .type
              }
              question={
                data?.assignments[getNextIndex(index, data.assignments.length)]
                  .question
              }
            />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -2,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              transform: [
                { scale: thirdScale },
                { translateY: thirdTranslateY },
              ],
            }}
          >
            <Assignment
              title={
                data?.assignments[
                  getNextIndex(index + 1, data.assignments.length)
                ].title
              }
              image={
                projects[
                  getNextIndex(
                    index + 1,
                    data?.assignments ? data.assignments.length : 0
                  ) % 3
                ].image
              }
              code={
                data?.assignments[
                  getNextIndex(index + 1, data.assignments.length)
                ].code
              }
              time={
                data?.assignments[
                  getNextIndex(index + 1, data.assignments.length)
                ].time
              }
              type={
                data?.assignments[
                  getNextIndex(index + 1, data.assignments.length)
                ].type
              }
              question={
                data?.assignments[
                  getNextIndex(index + 1, data.assignments.length)
                ].question
              }
            />
          </Animated.View>
        </Container>
        <Solve>
          {solve ? (
            data?.assignments[index].type === "TEXT" ? (
              <View style={{ paddingLeft: 16 }}>
                <Text style={{ color: "#fff", fontSize: 18, marginBottom: 8 }}>
                  {data?.assignments[index].code}
                </Text>
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
                  multiline
                  placeholder="Write your answer here"
                  onChangeText={(result: any) => {
                    setSolve(
                      solve?.map((my, i) => {
                        return i === index ? result : my;
                      })
                    );
                  }}
                  defaultValue={solve ? solve[index] : ""}
                />
              </View>
            ) : data?.assignments[index].type === "CODE" ? (
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
                multiline
                placeholder="Write your answer here"
                onChangeText={(result: any) => {
                  setSolve(
                    solve?.map((my, i) => {
                      return i === index ? result : my;
                    })
                  );
                }}
                defaultValue={solve ? solve[index] : ""}
              />
            ) : data?.assignments[index].type === "MULTIPLE" &&
              data.assignments[index].question ? (
              <View style={{ paddingLeft: 16 }}>
                <Text style={{ color: "#fff", fontSize: 18, marginBottom: 8 }}>
                  {data?.assignments[index].code}
                </Text>
                {data.assignments[index].question?.map((q, vt) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSolve(
                        solve.map((s, i) => {
                          return i === index
                            ? data.assignments[index].question![vt].content
                            : s;
                        })
                      );
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      {q.content === solve[index] ? (
                        <>
                          <AntDesign name="chrome" size={15} color="#768bff" />
                          <Text
                            style={{
                              color: "#768bff",
                              marginLeft: 8,
                              fontSize: 18,
                            }}
                          >
                            {q.content}
                          </Text>
                        </>
                      ) : (
                        <>
                          <AntDesign name="chrome" size={15} color="#8d8d8d" />
                          <Text
                            style={{
                              color: "#8d8d8d",
                              marginLeft: 8,
                              fontSize: 18,
                            }}
                          >
                            {q.content}
                          </Text>
                        </>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null
          ) : null}
        </Solve>
      </ScrollView>
    </>
  );
};

export default AssignmentScreen;

const View = styled.View``;

const ChatInput = styled.TextInput`
  border-radius: 14px;
  max-height: 300px;
  width: 290px;
  background-color: #fff;
  color: #5d5d5d;
  padding: 8px 16px;
`;

const Solve = styled.View`
  /* justify-content: center; */
  align-items: center;
  color: #fff;
  padding: 8px 20px;
  margin-top: 60px;
  height: 100%;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const SubmitButtonFixed = styled.View`
  border-radius: 25px;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 10;
  right: 10;
  z-index: 90;
  background-color: #0084ff;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Container = styled.View`
  justify-content: center;
  align-items: center;
  /* background: #f0f3f5; */
`;

const Text = styled.Text``;

const projects = [
  {
    title: "Price Tag",
    image: require("../assets/images/background5.jpg"),
    author: "Liu Yi",
    text:
      "Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China.",
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("../assets/images/background6.jpg"),
    author: "Chad Goodman",
    text:
      "Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. ",
  },
  {
    title: "Nikhiljay",
    image: require("../assets/images/background7.jpg"),
    author: "Nikhil D'Souza",
    text:
      "Recently finished the React course by @Mengto, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it.",
  },
];
