import React, { useState } from "react";
import styled, { DefaultTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useDispatch } from "react-redux";
import { TRIGGER_MENU, TRIGGER_TAB_BAR } from "../../../types";
import ForgotPasswordForm from "./ForgotPasswordForm";
interface AuthProps {
  setOpenAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
  isCourse?: number;
}

const AuthForm: React.FC<AuthProps> = ({ setOpenAuthForm, isCourse }) => {
  const [form, setForm] = useState(true);
  const [forgot, setForgot] = useState(false);
  const dispatch = useDispatch();

  const theme: DefaultTheme = {
    form: forgot ? "400px" : form ? "400px" : "520px",
  };

  return (
    <Container>
      <Touch
        onPress={() => {
          dispatch({ type: TRIGGER_MENU });
          if (!isCourse) {
            dispatch({ type: TRIGGER_TAB_BAR, payload: true });
          }
          setOpenAuthForm(false);
        }}
      ></Touch>
      <Modal theme={theme}>
        <Logo source={require("../../assets/images/logo-dc.png")} />
        <TouchableOpacity
          onPress={() => {
            setForgot(false);
            setForm(!form);
          }}
        >
          {form ? (
            <Text>Click here to REGISTER new Account !!!</Text>
          ) : (
            <Text>Already have an account ? SIGN IN here</Text>
          )}
        </TouchableOpacity>
        {forgot ? (
          <ForgotPasswordForm setForm={setForm} setForgot={setForgot} />
        ) : form ? (
          <LoginForm isCourse={isCourse} />
        ) : (
          <RegisterForm isCourse={isCourse} />
        )}
        <TouchableOpacity
          onPress={() => {
            setForgot(true);
          }}
        >
          <Text>Forgot Password</Text>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};

export default AuthForm;

const Touch = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Container = styled.View`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const Modal = styled.View`
  width: 335px;
  height: ${(props: any) => props.theme.form};
  border-radius: 20px;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  color: #b8bece;
  text-align: center;
`;
