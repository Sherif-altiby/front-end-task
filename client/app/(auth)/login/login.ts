import { api } from "@/lib/axios";
import { LoginPayload } from "@/types";



export async function login(payload: LoginPayload) {
  const response = await api.post("/api/auth/login", payload);
  return response.data;
}