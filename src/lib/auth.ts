let _token: string | null = null;
const TOKEN_KEY = 'pholia_token';

export function setToken(t: string | null) {
  _token = t;

  (async () => {
    try {
      const SecureStore = await import('expo-secure-store');
      if (SecureStore && typeof SecureStore.setItemAsync === 'function') {
        if (t) {
          await SecureStore.setItemAsync(TOKEN_KEY, t);
        } else {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
        }
        return;
      }
    } catch (e) {
      console.warn('SecureStoreが利用不可、またはトークン設定中にエラーが発生。代替手段としてAsyncStorageを試みます。', e);
    }

    try {
      const AsyncStorage = await import('@react-native-async-storage/async-storage');
      if (AsyncStorage && typeof AsyncStorage.setItem === 'function') {
        if (t) {
          await AsyncStorage.setItem(TOKEN_KEY, t);
        } else {
          await AsyncStorage.removeItem(TOKEN_KEY);
        }
        return;
      }
    } catch (e) {
      console.warn('AsyncStorageが利用不可、またはトークン設定中にエラーが発生。', e);
    }

    console.warn('トークンの永続化に利用可能なストレージがありません。トークンは再起動後に保持されません。');
  })();
}

export function getToken() {
  return _token;
}

export async function restoreToken() {
  if (_token) return _token;

  try {
    const SecureStore = await import('expo-secure-store');
    if (SecureStore && typeof SecureStore.getItemAsync === 'function') {
      const t = await SecureStore.getItemAsync(TOKEN_KEY);
      _token = t;
      return t;
    }
  } catch (e) {
    console.warn('SecureStore token restore error, will try fallback', e);
  }

  try {
    const AsyncStorage = await import('@react-native-async-storage/async-storage');
    if (AsyncStorage && typeof AsyncStorage.getItem === 'function') {
      const t = await AsyncStorage.getItem(TOKEN_KEY);
      _token = t;
      return t;
    }
  } catch (e) {
    console.warn('AsyncStorage token restore error', e);
  }

  return null;
}

export function clearToken() {
  setToken(null);
}

export default { setToken, getToken, restoreToken, clearToken };
