import { Formik } from "formik";
import React, { useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { TRIGGER_TAB_BAR } from "../../../types";
import { useLoginMutation, usePurchaseMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { Restart } from "fiction-expo-restart";
interface LoginFormProps {
  isCourse?: number;
}

const LoginForm: React.FC<LoginFormProps> = ({ isCourse }) => {
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

  const [, purchase] = usePurchaseMutation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [, login] = useLoginMutation();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      //   validate={() => {}}
      onSubmit={async ({ email, password }) => {
        const response = await login({
          usernameOrEmail: email,
          password: password,
        });

        if (response?.data) {
          if (response.data.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else {
            setErrors({});
            dispatch({ type: TRIGGER_TAB_BAR, payload: false });
            if (isCourse) {
              purchase({
                courseId: isCourse,
              });
            }
            Restart();
          }
        }
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
            placeholder="Email Adress"
            keyboardType="email-address"
            onFocus={focusEmail}
            style={{ borderColor: errors["email"] ? "red" : "#3c4560" }}
          />
          <IconEmail source={iconEmail} />
          {errors["email"] ? (
            <ValidationText>{errors["email"]}</ValidationText>
          ) : null}

          <TextInput
            onChangeText={handleChange("password")}
            value={values.password}
            placeholder="Password"
            secureTextEntry={true}
            onFocus={focusPassword}
            style={{ borderColor: errors["password"] ? "red" : "#3c4560" }}
          />
          <IconPassword source={iconPassword} />
          {errors["password"] ? (
            <ValidationText>{errors["password"]}</ValidationText>
          ) : null}

          <TouchableOpacity onPress={() => handleSubmit()}>
            <ButtonView>
              <ButtonText>Log in</ButtonText>
            </ButtonView>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;

const ValidationText = styled.Text`
  color: red;
`;

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
