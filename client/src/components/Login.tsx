import React, { useState } from "react";
import styled from "styled-components/native";
import { Formik } from "formik";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo";
interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [iconEmail, setIconEmail] = useState(
    require("../assets/images/icon-email.png")
  );
  const [iconPassword, setIconPassword] = useState(
    require("../assets/images/icon-password.png")
  );

  const focusEmail = () => {
    setIconEmail(require("../assets/images/icon-email-animated.gif"));
    setIconPassword(require("../assets/images/icon-password.png"));
  };

  const focusPassword = () => {
    setIconEmail(require("../assets/images/icon-email.png"));
    setIconPassword(require("../assets/images/icon-password-animated.gif"));
  };

  const tapBackground = () => {
    Keyboard.dismiss();
  };

  return (
    <Container>
      {/* <TouchableWithoutFeedback onPress={tapBackground}>
      </TouchableWithoutFeedback> */}
      <Modal>
        <Logo source={require("../assets/images/logo-dc.png")} />
        <Text>Start Learning. Access Pro Content.</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          //   validate={() => {}}
          onSubmit={({ email, password }) => {
            console.log(email + " " + password);
          }}
        >
          {({ handleSubmit, values, handleChange }) => (
            <>
              <TextInput
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="Email"
                keyboardType="email-address"
                onFocus={focusEmail}
              />
              <IconEmail source={iconEmail} />
              <TextInput
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="Password"
                secureTextEntry={true}
                onFocus={focusPassword}
              />
              <IconPassword source={iconPassword} />
              <TouchableOpacity onPress={() => handleSubmit}>
                <ButtonView>
                  <ButtonText>Log in</ButtonText>
                </ButtonView>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </Modal>
    </Container>
  );
};

export default Login;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 44px;
  margin-top: 20px;
`;

const Modal = styled.View`
  width: 335px;
  height: 370px;
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

const ButtonView = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;
