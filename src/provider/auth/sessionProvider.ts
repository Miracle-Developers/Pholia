import * as auth from "@/infrastructure/auth";

export async function restoreSessionToken() {
  return auth.restoreToken();
}
