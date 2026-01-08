import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ToastContext, type ToastPayload } from "@/hooks/useToast";

type ToastState = Required<Pick<ToastPayload, "duration">> & Omit<ToastPayload, "duration">;

type Props = {
  children: ReactNode;
};

export function ToastProvider({ children }: Props) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<ToastState | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((payload: ToastPayload) => {
    setToast({
      duration: payload.duration ?? 2500,
      title: payload.title,
      message: payload.message,
      actionLabel: payload.actionLabel,
      onAction: payload.onAction,
    });
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  const hideToast = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setToast(null);
      }
    });
  }, [opacity]);

  useEffect(() => {
    if (!toast) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    opacity.setValue(0);
    translateY.setValue(8);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();

    timerRef.current = setTimeout(hideToast, toast.duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [hideToast, opacity, toast, translateY]);

  const handleAction = () => {
    toast?.onAction?.();
    hideToast();
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <View style={styles.root}>
        {children}
        {toast ? (
          <View pointerEvents="box-none" style={styles.overlay}>
            <Animated.View
              style={[
                styles.toast,
                {
                  marginTop: insets.top + 12,
                  opacity,
                  transform: [{ translateY }],
                },
              ]}
            >
              <View style={styles.textBlock}>
                {toast.title ? <Text style={styles.title}>{toast.title}</Text> : null}
                {toast.message ? <Text style={styles.message}>{toast.message}</Text> : null}
              </View>
              {toast.actionLabel ? (
                <Pressable onPress={handleAction} style={styles.actionButton}>
                  <Text style={styles.actionText}>{toast.actionLabel}</Text>
                </Pressable>
              ) : null}
            </Animated.View>
          </View>
        ) : null}
      </View>
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    alignItems: "center",
  },
  toast: {
    maxWidth: "92%",
    backgroundColor: "rgba(28, 28, 28, 0.92)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  textBlock: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  message: {
    color: "#EDEDED",
    fontSize: 13,
    marginTop: 4,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
