import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../get-product-by-id";
 
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],

    queryFn: () =>
      getProductById(id),

    enabled: !!id, // prevents running before id exists

    placeholderData: (prev) => prev,
  });
};