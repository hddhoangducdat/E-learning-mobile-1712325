import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { NotificationIcon } from "./Icon";
import { Entypo } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ReduxReducers, TRIGGER_NOTI } from "../../types";
import { AntDesign } from "@expo/vector-icons";

const PopUpNoti = () => {
  const top = useRef(new Animated.Value(-44)).current;
  const notification: any = useSelector<ReduxReducers>(
    (state) => state.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(top, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (notification) {
      setTimeout(() => {
        Animated.timing(top, {
          toValue: -44,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }, 3000);
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <AnimatedContainer style={{ top }}>
      <Entypo name={notification.name} size={24} color="white" />
      <Text>{notification.noti}</Text>
      <View onPress={() => dispatch({ type: TRIGGER_NOTI, payload: false })}>
        <AntDesign name="close" size={24} color="white" />
      </View>
    </AnimatedContainer>
  );
};

export default PopUpNoti;

const View = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  height: 100%;
  width: 44px;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  background-color: #949393;
  flex-direction: row;
  position: absolute;
  width: 100%;
  height: 44px;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Text = styled.Text`
  color: #fff;
  margin-left: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;
