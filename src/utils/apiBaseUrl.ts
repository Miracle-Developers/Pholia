export function getApiBaseUrl() {
  if (typeof process === "undefined") return "";
  return process.env.EXPO_PUBLIC_API_URL || process.env.PHOLIA_API_URL || "";
}
