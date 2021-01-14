import { FontDisplay } from "expo-font";
import { Formik } from "formik";
import React, { useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { TRIGGER_NOTI, TRIGGER_TAB_BAR } from "../../../types";
import {
  useActivateAccountMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useLoginMutation,
  useMeQuery,
  usePurchaseMutation,
} from "../../generated/graphql";
import { useMakeEmailToken } from "../../utils/emailToken";
import { toErrorMap } from "../../utils/toErrorMap";
interface ActivateFormProps {
  activate: boolean;
  setActivate: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActivateForm: React.FC<ActivateFormProps> = ({
  activate,
  setActivate,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const [, activateMutation] = useActivateAccountMutation();

  if (!activate) return null;

  return (
    <Container>
      <Formik
        initialValues={{ token: "" }}
        //   validate={() => {}}
        onSubmit={async ({ token }) => {
          const response = await activateMutation({ token });
          if (response.data?.activateAccount.errors) {
            setErrors(toErrorMap(response.data.activateAccount.errors));
          } else {
            setActivate(false);
            dispatch({
              type: TRIGGER_NOTI,
              payload: {
                name: "email",
                noti: "Your account is activated",
              },
            });
          }
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <>
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
                <ButtonText>Activate</ButtonText>
              </ButtonView>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default ActivateForm;

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
  color: white;
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
