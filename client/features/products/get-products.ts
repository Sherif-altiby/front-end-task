import { api } from "@/lib/axios";
import { ProductsResponse } from "@/types";
 
interface Params {
  page: number;
  search: string;
  category: string;
  sort: string;
}

export const getProducts = async ({ page, search, category, sort }: Params) => {
  const { data } = await api.get<ProductsResponse>("/api/products", {
    params: {
      page,
      ...(search && { search }),
      ...(category !== "all" && { category }),
      ...(sort && { sort }),
    },
  });

  return data;
};
