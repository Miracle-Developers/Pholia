import { useAuthNavigation } from "../../../../hooks/useRouter";
import { TopForm } from "../TopForm";

export const TopContainer = () => {
  const { goToRegister, goToLogin } = useAuthNavigation();

  return <TopForm onPressSignUp={goToRegister} onPressLogin={goToLogin} />;
};
