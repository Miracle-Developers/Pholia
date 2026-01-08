export const emailOrIdRule = {
  required: "メールアドレスまたはユーザーIDを入力してください",
  validate: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    /^@?[a-zA-Z0-9._-]{3,}$/.test(value) ||
    "メールアドレスまたはユーザーIDの形式が正しくありません",
};

export const passwordRule = {
  required: "パスワードを入力してください",
  minLength: { value: 8, message: "8文字以上で入力してください" },
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: "半角英数字のみで入力してください",
  },
};

export const confirmPasswordRule = (getPassword: () => string | undefined) => ({
  required: "パスワードを再入力してください",
  validate: (value?: string) => value === getPassword() || "パスワードが一致しません",
});

export const nameRule = {
  required: "名前を入力してください",
};

export const userIdRule = {
  required: "ユーザーIDを入力してください",
  pattern: {
    value: /^@?[a-zA-Z0-9._-]{3,}$/,    
    message: "英数字・._-を含む3文字以上で入力してください",
  },
};

export const isEmail = (value?: string) => !!(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
export const isUserId = (value?: string) => !!(value && /^@?[a-zA-Z0-9._-]{3,}$/.test(value));

export async function showAlert(title: string, message?: string, buttons?: Array<{ text: string; onPress?: () => void }>) {
  const { Alert } = await import('react-native');
  Alert.alert(title, message, buttons as any);
}

export async function loginSuccess(onOk?: () => void) {
  await showAlert('ログインしました', undefined, [{ text: 'OK', onPress: onOk }]);
}

export async function loginFailed(message?: string) {
  await showAlert('ログインに失敗しました', message);
}

export async function missingRegistrationStep1(onBack?: () => void) {
  await showAlert('情報が不足しています', 'メールアドレスとパスワードを先に入力してください', [
    { text: '戻る', onPress: onBack },
  ]);
}

export async function registerFailed(message?: string) {
  await showAlert('登録に失敗しました', message);
}

