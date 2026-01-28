import { useEffect } from "react";

import { restoreSessionToken } from "@/provider/auth/sessionProvider";

export const useAuthBootstrap = () => {
  useEffect(() => {
    void restoreSessionToken();
  }, []);
};
