import { saveRegistrationStepOne } from "@/application/auth/usecases/registerStepOne";

type RegisterStepOneInput = {
  email: string;
  password: string;
};

export function registerStepOne(input: RegisterStepOneInput) {
  saveRegistrationStepOne(input);
}
