import * as auth from "@/infrastructure/auth";

export const restoreSessionToken = async () => {
  return auth.restoreToken();
};
