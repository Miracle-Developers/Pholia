let _token: string | null = null;
let _userId: string | null = null;
const TOKEN_KEY = "pholia_token";
const USER_ID_KEY = "pholia_user_id";

/**
 * JWTトークンをデコードしてペイロードを取得
 */
function decodeToken(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
  } catch (error) {
    console.warn("Token decode error:", error);
    return null;
  }
}

export function setToken(t: string | null) {
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
}

export function getToken() {
  return _token;
}

export function setUserId(id: string | null) {
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
}

export function getUserId() {
  return _userId;
}

export async function restoreToken() {
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
}

export async function restoreUserId() {
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
    if (payload?.sub || payload?.id) {
      const userId = String(payload.sub || payload.id);
      _userId = userId;
      setUserId(userId);
      return userId;
    }
  }

  return null;
}

export function clearToken() {
  setToken(null);
  setUserId(null);
}

export default { setToken, getToken, setUserId, getUserId, restoreToken, restoreUserId, clearToken };
