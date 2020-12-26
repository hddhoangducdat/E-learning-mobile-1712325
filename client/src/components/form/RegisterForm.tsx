import { Formik } from "formik";
import React, { useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { TRIGGER_TAB_BAR } from "../../../types";
import { useRegisterMutation } from "../../generated/graphql";
interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const [iconEmail, setIconEmail] = useState(
    require("../../assets/images/icon-email.png")
  );
  const [iconPassword, setIconPassword] = useState(
    require("../../assets/images/icon-password.png")
  );

  const focusEmail = () => {
    setIconEmail(require("../../assets/images/icon-email-animated.gif"));
    setIconPassword(require("../../assets/images/icon-password.png"));
  };

  const focusPassword = () => {
    setIconEmail(require("../../assets/images/icon-email.png"));
    setIconPassword(require("../../assets/images/icon-password-animated.gif"));
  };

  const tapBackground = () => {
    Keyboard.dismiss();
  };

  const [, register] = useRegisterMutation();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ email: "", password: "", phone: "", username: "" }}
      //   validate={() => {}}
      onSubmit={async ({ email, password, phone, username }) => {
        const response = await register({
          options: {
            email,
            password: password.toLowerCase(),
            phone,
            username,
          },
        });
        if (response?.data) {
          dispatch({ type: TRIGGER_TAB_BAR, payload: true });
        }
        // console.log(response.data);
        // setOpenAuthForm((value) => {
        //   return !value;
        // });
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
          <TextInput
            onChangeText={handleChange("username")}
            value={values.username}
            placeholder="Username"
            onFocus={focusEmail}
          />
          {/* <IconEmail source={iconEmail} /> */}
          <TextInput
            onChangeText={handleChange("phone")}
            value={values.phone}
            placeholder="Phone"
            onFocus={focusEmail}
          />
          {/* <IconEmail source={iconEmail} /> */}
          <TouchableOpacity onPress={() => handleSubmit()}>
            <ButtonView>
              <ButtonText>Sign up</ButtonText>
            </ButtonView>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

export default RegisterForm;

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
