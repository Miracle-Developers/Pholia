const BASE_URL =
  typeof process !== "undefined" && process.env?.PHOLIA_API_URL
    ? process.env.PHOLIA_API_URL
    : "https://pholia-back.hanpenneko.workers.dev";

import * as auth from "@/infrastructure/auth";

async function request(path: string, method = "GET", body?: any, isForm = false) {
  const headers: Record<string, string> = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  const token = auth.getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

export async function login(payload: { email?: string; id?: string; password: string }) {
  return request("/auth/login", "POST", payload);
}

export async function registerUser(payload: {
  user_handle?: string;
  id?: string;
  name: string;
  email: string;
  password: string;
}) {
  const body: any = {
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

export default { login, registerUser, getUser };
