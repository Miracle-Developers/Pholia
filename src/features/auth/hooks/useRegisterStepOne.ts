import { useCallback } from "react";

import type { AuthFormData } from "@/application/auth/types";
import { saveRegistrationStepOne } from "@/application/auth/usecases/registerStepOne";
import { useRouterNavigation } from "@/hooks/useRouter";

export const useRegisterStepOne = () => {
  const { goToRegisterProfile } = useRouterNavigation();

  const handleNext = useCallback(
    (values: AuthFormData) => {
      saveRegistrationStepOne({ email: values.email, password: values.password });
      goToRegisterProfile();
    },
    [goToRegisterProfile],
  );

  return { handleNext };
};
