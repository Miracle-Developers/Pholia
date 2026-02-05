
// グローバルフォント設定
export const FONT_FAMILY = {
  light: "KiwiMaru_300Light",
  regular: "KiwiMaru_400Regular",
  medium: "KiwiMaru_500Medium",
} as const;

// デフォルトフォントファミリー
export const DEFAULT_FONT_FAMILY = FONT_FAMILY.regular;

// Textコンポーネントのデフォルトスタイル
export const defaultTextStyle = {
  fontFamily: DEFAULT_FONT_FAMILY,
};

// TextInputコンポーネントのデフォルトスタイル
export const defaultTextInputStyle = {
  fontFamily: DEFAULT_FONT_FAMILY,
};
