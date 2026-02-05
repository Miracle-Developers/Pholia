import { useEffect } from "react";

import * as auth from "@/infrastructure/auth";

export const useAuthBootstrap = () => {
  useEffect(() => {
    void auth.restoreToken();
  }, []);
};
