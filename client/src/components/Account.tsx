import React, { useState } from "react";
import styled, { DefaultTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import {
  useMeQuery,
  useBecomeOrUpdateInstructorMutation,
  useUpdateUserMutation,
} from "../generated/graphql";
import { TRIGGER_MENU, TRIGGER_TAB_BAR } from "../../types";
import { Formik } from "formik";
import { transform } from "@babel/core";
import { ScrollView } from "react-native-gesture-handler";
interface AccountProps {
  setOpenAccountForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountForm: React.FC<AccountProps> = ({ setOpenAccountForm }) => {
  const [{ data }] = useMeQuery();
  const [, becomeOrUpdateInstructor] = useBecomeOrUpdateInstructorMutation();
  const [, updateUser] = useUpdateUserMutation();
  const [form, setForm] = useState(true);
  const dispatch = useDispatch();

  const theme: DefaultTheme = {
    form: form ? "400px" : "520px",
  };

  const [role, setRole] = useState(
    data?.me?.instructor ? "TEACHER" : "STUDENT"
  );

  return (
    <Container
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <Touch
        onPress={() => {
          dispatch({ type: TRIGGER_TAB_BAR, payload: true });
          setOpenAccountForm(false);
        }}
      ></Touch>
      <Modal theme={theme}>
        <Avatar source={{ uri: data?.me?.avatar }} />

        <Formik
          initialValues={{
            email: data?.me?.email,
            username: data?.me?.username,
            phone: data?.me?.phone,
            major: data?.me?.instructor?.major,
            intro: data?.me?.instructor?.intro,
          }}
          //   validate={() => {}}
          onSubmit={async ({ email, username, phone, major, intro }) => {
            await updateUser({
              username: username!,
              phone: phone!,
              email: email!,
            });
            if (role === "TEACHER") {
              await becomeOrUpdateInstructor({
                intro: intro!,
                major: major!,
              });
            }
            dispatch({ type: TRIGGER_TAB_BAR, payload: true });
            setOpenAccountForm(false);
          }}
        >
          {({ handleSubmit, values, handleChange }) => (
            <>
              <ScrollView
                style={{
                  transform: [{ translateY: -50 }],
                }}
              >
                <TextInput
                  onChangeText={handleChange("email")}
                  value={values.email}
                  placeholder="Email"
                  keyboardType="email-address"
                />
                <TextInput
                  onChangeText={handleChange("username")}
                  value={values.username}
                  placeholder="Username"
                />
                <TextInput
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                  placeholder="Phone number"
                />
                <Picker
                  selectedValue={role}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue: any, itemIndex: any) =>
                    setRole(itemValue)
                  }
                >
                  <Picker.Item label="STUDENT" value="STUDENT" />
                  <Picker.Item label="TEACHER" value="TEACHER" />
                </Picker>
                {role === "TEACHER" ? (
                  <>
                    <TextInput
                      onChangeText={handleChange("major")}
                      value={values.major}
                      placeholder="Major"
                    />
                    <TextInput
                      onChangeText={handleChange("intro")}
                      value={values.intro}
                      placeholder="Introduction"
                    />
                  </>
                ) : null}
              </ScrollView>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <ButtonView
                  style={{
                    transform: [{ translateY: -30 }],
                  }}
                >
                  <ButtonText>Update</ButtonText>
                </ButtonView>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </Modal>
    </Container>
  );
};

export default AccountForm;

const Picker = styled.Picker`
  border: 1px solid #dbdfea;
  width: 270px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  text-align: center;
`;

const Avatar = styled.Image`
  transform: translateY(-80px);
  margin-top: 40px;
  width: 120px;
  height: 120px;
  background: black;
  border-radius: 22px;
`;

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
  margin-bottom: 50px;
  width: 300px;
  height: 480px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 270px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  text-align: center;
`;

const ButtonView = styled.View`
  background: #5263ff;
  width: 270px;
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
