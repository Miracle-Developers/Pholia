import { ExpoRoot } from "expo-router";
import { ctx } from "expo-router/_ctx";

import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";

export default function App() {
  useAuthBootstrap();

  return <ExpoRoot context={ctx} />;
}
