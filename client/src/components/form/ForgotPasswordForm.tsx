import { FontDisplay } from "expo-font";
import { Formik } from "formik";
import React, { useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { TRIGGER_NOTI, TRIGGER_TAB_BAR } from "../../../types";
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useLoginMutation,
  usePurchaseMutation,
} from "../../generated/graphql";
import { useMakeEmailToken } from "../../utils/emailToken";
import { toErrorMap } from "../../utils/toErrorMap";
interface ForgotPasswordFormProps {
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
  setForgot: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  setForm,
  setForgot,
}) => {
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const [, forgotPassword] = useForgotPasswordMutation();
  const [, changePassword] = useChangePasswordMutation();
  const [step, setStep] = useState(false);

  if (step) {
    return (
      <Formik
        initialValues={{ token: "", newPassword: "" }}
        //   validate={() => {}}
        onSubmit={async ({ token, newPassword }) => {
          const response = await changePassword({ token, newPassword });
          if (response.data?.changePassword.errors) {
            setErrors(toErrorMap(response.data.changePassword.errors));
          } else {
            setForgot(false);
            setForm(true);
            dispatch({
              type: TRIGGER_NOTI,
              payload: {
                name: "email",
                noti: "You have changed your password",
              },
            });
          }
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <>
            <TextInput
              onChangeText={handleChange("newPassword")}
              value={values.newPassword}
              placeholder="Write yout new password"
              onFocus={focusEmail}
              secureTextEntry={true}
              style={{ borderColor: errors["newPassword"] ? "red" : "#3c4560" }}
            />
            {errors["newPassword"] ? (
              <ValidationText>{errors["newPassword"]}</ValidationText>
            ) : null}

            <TextInput
              onChangeText={handleChange("token")}
              value={values.token}
              placeholder="Activate token"
              style={{ borderColor: errors["token"] ? "red" : "#3c4560" }}
            />
            {errors["token"] ? (
              <ValidationText>{errors["token"]}</ValidationText>
            ) : null}

            <TouchableOpacity onPress={() => handleSubmit()}>
              <ButtonView>
                <ButtonText>Reset Password</ButtonText>
              </ButtonView>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    );
  } else
    return (
      <Formik
        initialValues={{ email: "" }}
        //   validate={() => {}}
        onSubmit={async ({ email }) => {
          await forgotPassword({
            email,
            token: useMakeEmailToken(6),
          });
          setStep(true);
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <>
            <View></View>
            <TextInput
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="Email Address"
              keyboardType="email-address"
              onFocus={focusEmail}
              style={{ borderColor: errors["email"] ? "red" : "#3c4560" }}
            />
            {errors["email"] ? (
              <ValidationText>{errors["email"]}</ValidationText>
            ) : null}

            <TouchableOpacity onPress={() => handleSubmit()}>
              <ButtonView>
                <ButtonText>Reset Password</ButtonText>
              </ButtonView>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    );
};

export default ForgotPasswordForm;

const View = styled.View`
  height: 40px;
`;

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
