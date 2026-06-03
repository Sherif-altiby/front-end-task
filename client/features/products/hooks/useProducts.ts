import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../get-products";

export const useProducts = ({
  page,
  search,
  category,
  sort,
}: {
  page: number;
  search: string;
  category: string;
  sort: string;
}) => {
  return useQuery({
    queryKey: ["products", page, search, category, sort],

    queryFn: () =>
      getProducts({
        page,
        search,
        category,
        sort,
      }),

    placeholderData: (prev) => prev,
  });
};