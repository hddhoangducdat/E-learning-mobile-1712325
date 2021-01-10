import { UserInput } from "../resolvers/UserInput";

export const validateRegister = (options: UserInput) => {
  if (options.phone.length !== 10) {
    return [
      {
        field: "phone",
        message: "Not a Vietnamese's phone number",
      },
    ];
  }
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }
  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "length must be greater than 3",
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "username cannot include @",
      },
    ];
  }

  return null;
};
