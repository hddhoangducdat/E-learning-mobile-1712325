import React, { useState } from "react";
import styled, { DefaultTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
interface AuthProps {
  setOpenAuthForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthForm: React.FC<AuthProps> = ({ setOpenAuthForm }) => {
  const [form, setForm] = useState(true);

  const theme: DefaultTheme = {
    form: form ? "400px" : "520px",
  };

  return (
    <Container>
      <TouchableOpacity onPress={() => {}}></TouchableOpacity>
      <Modal theme={theme}>
        <Logo source={require("../../assets/images/logo-dc.png")} />
        <TouchableOpacity
          onPress={() => {
            setForm(!form);
          }}
        >
          {form ? (
            <Text>Click here to REGISTER new Account !!!</Text>
          ) : (
            <Text>Already have an account ? SIGN IN here</Text>
          )}
        </TouchableOpacity>
        {form ? <LoginForm /> : <RegisterForm />}
      </Modal>
    </Container>
  );
};

export default AuthForm;

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
  height: ${(props) => props.theme.form};
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
