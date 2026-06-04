import { api } from "@/lib/axios";
import { RegisterSchema } from "@/validations/register.schema";

export const registerUser = async (data: RegisterSchema) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};