import { useEffect } from "react";

import { restoreSessionToken } from "@/provider/auth/sessionProvider";

export function useAuthBootstrap() {
  useEffect(() => {
    void restoreSessionToken();
  }, []);
}
