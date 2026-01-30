let _token: string | null = null;
let _userId: string | null = null;
const TOKEN_KEY = "pholia_token";
const USER_ID_KEY = "pholia_user_id";

/**
 * JWTトークンをデコードしてペイロードを取得
 */
const decodeToken = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
  } catch (error) {
    console.warn("Token decode error:", error);
    return null;
  }
};

export const setToken = (t: string | null) => {
  _token = t;

  (async () => {
    try {
      const SecureStore = await import("expo-secure-store");
      if (SecureStore && typeof SecureStore.setItemAsync === "function") {
        if (t) {
          await SecureStore.setItemAsync(TOKEN_KEY, String(t));
        } else {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
        }
        return;
      }
    } catch (e) {
      console.warn("SecureStoreでのトークン設定エラー:", e);
    }
  })();
};

export const getToken = () => _token;

export const setUserId = (id: string | null) => {
  _userId = id;

  (async () => {
    try {
      const SecureStore = await import("expo-secure-store");
      if (SecureStore && typeof SecureStore.setItemAsync === "function") {
        if (id) {
          await SecureStore.setItemAsync(USER_ID_KEY, String(id));
        } else {
          await SecureStore.deleteItemAsync(USER_ID_KEY);
        }
        return;
      }
    } catch (e) {
      console.warn("SecureStoreでのuserId設定エラー:", e);
    }
  })();
};

export const getUserId = () => _userId;

export const restoreToken = async () => {
  if (_token) return _token;

  try {
    const SecureStore = await import("expo-secure-store");
    if (SecureStore && typeof SecureStore.getItemAsync === "function") {
      const t = await SecureStore.getItemAsync(TOKEN_KEY);
      _token = t;
      return t;
    }
  } catch (e) {
    console.warn("SecureStoreでのトークン復元エラー:", e);
  }

  return null;
};

export const restoreUserId = async () => {
  if (_userId) return _userId;

  try {
    const SecureStore = await import("expo-secure-store");
    if (SecureStore && typeof SecureStore.getItemAsync === "function") {
      const id = await SecureStore.getItemAsync(USER_ID_KEY);
      if (id) {
        _userId = id;
        return id;
      }
    }
  } catch (e) {
    console.warn("SecureStoreでのuserId復元エラー:", e);
  }

  // トークンがあればトークンから復元
  const token = _token || (await restoreToken());
  if (token) {
    const payload = decodeToken(token);
    const payloadSub = payload?.sub;
    const payloadId = payload?.id;
    const rawUserId =
      typeof payloadSub === "string" || typeof payloadSub === "number"
        ? payloadSub
        : typeof payloadId === "string" || typeof payloadId === "number"
          ? payloadId
          : null;
    if (rawUserId !== null) {
      const userId = String(rawUserId);
      _userId = userId;
      setUserId(userId);
      return userId;
    }
  }

  return null;
};

export const clearToken = () => {
  setToken(null);
  setUserId(null);
};

export default {
  setToken,
  getToken,
  setUserId,
  getUserId,
  restoreToken,
  restoreUserId,
  clearToken,
};
