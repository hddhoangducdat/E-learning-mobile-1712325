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

interface ProjectsScreenProps {}

const ProjectsScreen: React.FC<ProjectsScreenProps> = ({}) => {
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
              setIndex(getNextIndex(index, projects.length));
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

  return (
    <Container>
      <AnimatedMask style={{ opacity }} />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder?.panHandlers}
      >
        <Project
          title={projects[index].title}
          image={projects[index].image}
          author={projects[index].author}
          text={projects[index].text}
          canOpen={true}
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
        <Project
          title={projects[getNextIndex(index, projects.length)].title}
          image={projects[getNextIndex(index, projects.length)].image}
          author={projects[getNextIndex(index, projects.length)].author}
          text={projects[getNextIndex(index, projects.length)].text}
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
          transform: [{ scale: thirdScale }, { translateY: thirdTranslateY }],
        }}
      >
        <Project
          title={projects[getNextIndex(index + 1, projects.length)].title}
          image={projects[getNextIndex(index + 1, projects.length)].image}
          author={projects[getNextIndex(index + 1, projects.length)].author}
          text={projects[getNextIndex(index + 1, projects.length)].text}
        />
      </Animated.View>
    </Container>
  );
};

export default ProjectsScreen;

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
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
