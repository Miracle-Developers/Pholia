import { createContext, useContext } from "react";

export type ToastPayload = {
  title?: string;
  message?: string;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
};

type ToastContextValue = {
  showToast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const noopShowToast = () => {
  console.warn("ToastProvider is not mounted");
};

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  return ctx ?? { showToast: noopShowToast };
}

export { ToastContext };
