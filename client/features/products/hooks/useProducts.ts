"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProducts } from "../get-products";
import { useAppDispatch } from "@/store/hooks";
import { setProducts } from "@/store/slices/productsSlice";

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
  const dispatch = useAppDispatch();

  const query = useQuery({
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

   useEffect(() => {
    if (query.data?.data) {
      dispatch(setProducts(query.data.data));
    }
  }, [query.data, dispatch]);

  return query;
};