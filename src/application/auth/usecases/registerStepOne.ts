import * as registrationTemp from "@/application/auth/state/registrationTemp";

type RegisterStepOneInput = {
  email: string;
  password: string;
};

export const saveRegistrationStepOne = (input: RegisterStepOneInput) => {
  registrationTemp.setStepOne({
    email: input.email,
    password: input.password,
  });
};
