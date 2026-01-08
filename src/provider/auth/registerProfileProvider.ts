import {
  type RegisterProfileResult,
  registerProfileAndLogin,
} from "@/infrastructure/auth/registerProfile";

type RegisterProfileInput = {
  userId?: string;
  name: string;
};

export async function registerProfile(input: RegisterProfileInput): Promise<RegisterProfileResult> {
  return registerProfileAndLogin(input);
}
