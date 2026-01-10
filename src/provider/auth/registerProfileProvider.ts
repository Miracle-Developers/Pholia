import {
  type RegisterProfileResult,
  registerProfileAndLogin,
} from "@/application/auth/usecases/registerProfile";

type RegisterProfileInput = {
  userId?: string;
  name: string;
};

export async function registerProfile(input: RegisterProfileInput): Promise<RegisterProfileResult> {
  return registerProfileAndLogin(input);
}
