import { saveRegistrationStepOne } from "@/infrastructure/auth/registerStepOne";

type RegisterStepOneInput = {
  email: string;
  password: string;
};

export function registerStepOne(input: RegisterStepOneInput) {
  saveRegistrationStepOne(input);
}
