import React from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { NotificationIcon } from "./Icon";
import { useDispatch } from "react-redux";
import { TRIGGER_NOTI } from "../../types";

const NotificationButton = () => {
  const dispatch = useDispatch();
  return (
    <Container
      onPress={() => {
        dispatch({
          type: TRIGGER_NOTI,
          payload: {
            name: "email",
            noti: "email has been sent",
          },
        });
      }}
    >
      <FontAwesome name="warning" size={24} color="red" />
      <Text>Activate account</Text>
    </Container>
  );
};

export default NotificationButton;

const Container = styled.TouchableOpacity`
  position: absolute;
  right: 5px;
  width: 70px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

const Bubble = styled.View`
  width: 16px;
  height: 16px;
  background: #3c4560;
  position: absolute;
  top: 0px;
  right: 5px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;

const Text = styled.Text`
  color: #000;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
`;
