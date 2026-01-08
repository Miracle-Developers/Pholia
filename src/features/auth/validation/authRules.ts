export const emailOrIdRule = {
  required: "メールアドレスまたはユーザーIDを入力してください",
  validate: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    /^[a-zA-Z0-9._-]{3,}$/.test(value) ||
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
    value: /^[a-zA-Z0-9._-]{3,}$/,
    message: "ユーザーIDは英数字・._-を含む3文字以上で入力してください",
  },
};
