import { saveRegistrationStepOne } from "@/application/auth/usecases/registerStepOne";

type RegisterStepOneInput = {
  email: string;
  password: string;
};

export const registerStepOne = (input: RegisterStepOneInput) => {
  saveRegistrationStepOne(input);
};
