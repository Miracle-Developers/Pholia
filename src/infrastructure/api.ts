const BASE_URL = typeof process !== 'undefined' && process.env?.PHOLIA_API_URL ? process.env.PHOLIA_API_URL : 'https://pholia-back.hanpenneko.workers.dev';

import * as auth from "@/infrastructure/auth";

type JsonBody = Record<string, unknown> | ReadonlyArray<unknown>;

type LoginResponse = {
  token?: string;
  user?: { id?: string };
  user_id?: string;
  userId?: string;
};

// HTTP リクエストの共通処理
function request<T>(
  path: string,
  method?: string,
  body?: JsonBody | null,
  isForm?: false,
): Promise<T>;
function request<T>(
  path: string,
  method: string,
  body: BodyInit | null | undefined,
  isForm: true,
): Promise<T>;
async function request<T>(
  path: string,
  method = "GET",
  body?: JsonBody | BodyInit | null,
  isForm = false,
) {
  const headers: Record<string, string> = isForm
    ? {}
    : { "Content-Type": "application/json" };
  const token = auth.getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const requestBody = isForm
    ? (body as BodyInit | null | undefined)
    : body
      ? JSON.stringify(body)
      : undefined;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: requestBody,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }
  return (await res.text()) as T;
}

export async function login(payload: {
  email?: string;
  id?: string;
  password: string;
}) {
  return request<LoginResponse>("/auth/login", "POST", payload);
}

export async function registerUser(payload: {
  user_handle?: string;
  id?: string;
  name: string;
  email: string;
  password: string;
}) {
  const body: {
    name: string;
    email: string;
    password: string;
    user_handle?: string;
    id?: string;
  } = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
  };
  if (payload.user_handle) body.user_handle = payload.user_handle;
  if (payload.id) body.id = payload.id;
  return request("/users", "POST", body);
}

export async function getUser(id: string) {
  return request(`/users/${encodeURIComponent(id)}`);
}

export async function getUserStats(userId: string) {
  return request(`/users/${encodeURIComponent(userId)}/stats`);
}

export async function updateUserSettings(userId: string, payload: Record<string, unknown>) {
  return request(`/users/${encodeURIComponent(userId)}/settings`, "POST", payload);
}

export async function getUserSettings(userId: string) {
  return request(`/users/${encodeURIComponent(userId)}/settings`, "GET");
}

export async function uploadAvatar(file: {
  uri: string;
  name: string;
  type: string;
}) {
  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as any);

  const headers: Record<string, string> = {};
  const token = auth.getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/leaves`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Avatar upload failed: ${res.status} ${text}`);
  }

  return (await res.json()) as { file_key: string };
}

export async function updateUser(userId: string, payload: Record<string, unknown>) {
  return request(`/users/${encodeURIComponent(userId)}`, "PATCH", payload);
}

export async function deleteUser(userId: string) {
  return request(`/users/${encodeURIComponent(userId)}`, "DELETE");
}

export default { login, registerUser, getUser, getUserStats, updateUserSettings, getUserSettings, uploadAvatar, updateUser, deleteUser };
