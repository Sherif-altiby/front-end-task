import { api } from "@/lib/axios";

export const getProductById = async (id: string) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data.data;
};