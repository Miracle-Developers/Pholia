import { useCallback } from "react";

import type { AuthFormData } from "@/application/auth/types";
import { useRouterNavigation } from "@/hooks/useRouter";
import { registerStepOne } from "@/provider/auth/registerStepOneProvider";

export const useRegisterStepOne = () => {
  const { goToRegisterProfile } = useRouterNavigation();

  const handleNext = useCallback(
    (values: AuthFormData) => {
      registerStepOne({ email: values.email, password: values.password });
      goToRegisterProfile();
    },
    [goToRegisterProfile],
  );

  return { handleNext };
};
