import * as auth from "@/infrastructure/auth";
import { getApiBaseUrl } from "@/utils/apiBaseUrl";

const BASE_URL = getApiBaseUrl();

type JsonBody = Record<string, unknown> | ReadonlyArray<unknown>;

type LoginResponse = {
  user?: ApiUserResponse;
  token: string;
};

export type ApiUserResponse = {
  id: number;
  name: string;
  user_handle: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
};

export type ApiStatsResponse = {
  friends_count?: number;
  tree_count?: number;
};

export type ApiLeafResponse = {
  id: number;
  tree_id: number;
  uploader_id?: number;
  uploaded_by?: number;
  file_key?: string;
  r2_key?: string;
  r2_url?: string;
  caption?: string;
  title?: string;
  taken_at: string;
  created_at: string;
};

export type ApiStructureResponse = unknown;

export type ApiTreeResponse = {
  id: number;
  name: string;
  forest_id?: number;
  created_at?: string;
};

export type ApiTreeMemberResponse = {
  id?: number;
  tree_id?: number;
  user_id?: number;
  role?: string;
  created_at?: string;
};

export type ApiForestResponse = {
  id: number;
  name: string;
  description?: string;
  user_id?: number;
  sort_order?: number;
  created_at?: string;
};

// HTTP リクエストの共通処理
const request = async <T>(
  path: string,
  method = "GET",
  body?: JsonBody | BodyInit | null,
  isForm = false,
): Promise<T> => {
  if (!BASE_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is not set");
  }
  const headers: Record<string, string> = isForm ? {} : { "Content-Type": "application/json" };
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
    const error = new Error(`API ${method} ${path} failed: ${res.status} ${text}`) as Error & {
      status?: number;
    };
    error.status = res.status;
    throw error;
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const text = await res.text();
    if (!text) return {} as T;
    return JSON.parse(text) as T;
  }
  return (await res.text()) as T;
};

export const login = async (payload: { email?: string; id?: string; password: string }) => {
  return request<LoginResponse>("/auth/login", "POST", payload);
};

export const registerUser = async (payload: {
  user_handle?: string;
  id?: string;
  name: string;
  email: string;
  password: string;
}) => {
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
};

export const getUser = async (id: string) => request(`/users/${encodeURIComponent(id)}`);

export const getLeaf = async (id: number | string) =>
  request<ApiLeafResponse>(`/leaves/${encodeURIComponent(String(id))}`);

export const getTree = async (id: number | string) =>
  request<ApiTreeResponse>(`/trees/${encodeURIComponent(String(id))}`);

export const getForest = async (id: number | string) =>
  request<ApiForestResponse>(`/forests/${encodeURIComponent(String(id))}`);

export const uploadLeaf = async (
  file: {
    uri: string;
    name: string;
    type: string;
  },
  treeId?: number,
) => {
  if (!BASE_URL) {
    throw new Error("EXPO_PUBLIC_API_URL is not set");
  }
  const formData = new FormData();
  formData.append("file", file as unknown as Blob);
  if (typeof treeId === "number") {
    formData.append("tree_id", String(treeId));
  }

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
    throw new Error(`Leaf upload failed: ${res.status} ${text}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const text = await res.text();
    if (text) {
      return JSON.parse(text) as ApiLeafResponse;
    }
  }
  return {} as ApiLeafResponse;
};

export const getUserStats = async (userId: string) =>
  request(`/users/${encodeURIComponent(userId)}/stats`);

export const getUserSettings = async (userId: string) =>
  request(`/users/${encodeURIComponent(userId)}/settings`, "GET");

export const getUserStructure = async (userId: string) =>
  request<ApiStructureResponse>(`/users/${encodeURIComponent(userId)}/structure`, "GET");

export const getUserForests = async (userId: string) =>
  request(`/users/${encodeURIComponent(userId)}/forests`, "GET");

export const uploadAvatar = async (
  userId: string,
  file: {
    uri: string;
    name: string;
    type: string;
  },
) => {
  const formData = new FormData();
  formData.append("file", file as unknown as Blob);

  const headers: Record<string, string> = {};
  const token = auth.getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(userId)}/avatar`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Avatar upload failed: ${res.status} ${text}`);
  }

  const response = (await res.json()) as ApiUserResponse;
  return { file_key: response.avatar_url || "" };
};

export const createForest = async (
  userId: string,
  payload: { name: string; sort_order?: number },
) => {
  return request<ApiForestResponse>(
    `/users/${encodeURIComponent(userId)}/forests`,
    "POST",
    payload,
  );
};

export const createTree = async (payload: { forest_id: number; name: string }) => {
  return request<ApiTreeResponse>("/trees", "POST", payload);
};

export const addTreeMember = async (treeId: number, payload: { user_id: number; role: string }) => {
  return request<ApiTreeMemberResponse>(
    `/trees/${encodeURIComponent(String(treeId))}/members`,
    "POST",
    payload,
  );
};

export const getTreeMembers = async (treeId: number) => {
  return request<ApiTreeMemberResponse[]>(
    `/trees/${encodeURIComponent(String(treeId))}/members`,
    "GET",
  );
};

export const updateUser = async (userId: string, payload: Record<string, unknown>) =>
  request(`/users/${encodeURIComponent(userId)}`, "PATCH", payload);

export const deleteUser = async (userId: string) =>
  request(`/users/${encodeURIComponent(userId)}`, "DELETE");

export default {
  login,
  registerUser,
  getUser,
  getLeaf,
  getTree,
  getForest,
  getUserStats,
  getUserSettings,
  getUserStructure,
  getUserForests,
  createForest,
  createTree,
  addTreeMember,
  getTreeMembers,
  uploadAvatar,
  uploadLeaf,
  updateUser,
  deleteUser,
};
