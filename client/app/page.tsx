"use client";

import { useMemo, useState } from "react";

import ProductGrid from "@/features/products/components/ProductGrid";
import ProductFilters from "@/features/products/components/ProductFilters";
import ProductsPagination from "@/features/products/components/ProductsPagination";
import { useProducts } from "@/features/products/hooks/useProducts";
import ProductSkeleton from "@/features/products/components/ProductSkeleton";
 
export default function ProductsPage() {

 
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("low");
  const [page, setPage] = useState(1);

  const { data, isFetching } = useProducts({
    page,
    search,
    category,
    sort
  });

  const products = useMemo(() => {
    if (!data?.data) return [];

    return [...data.data].sort((a, b) =>
      sort === "low" ? a.price - b.price : b.price - a.price
    );
  }, [data, sort]);

  return (
    <div className=" py-10">
      <div className="grid lg:grid-cols-[280px_1fr] gap-8">

        {/* FILTERS (always visible) */}
        <ProductFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {/* PRODUCTS */}
        <div className="space-y-8">

          {/* Skeleton instead of loading text */}
          {isFetching ? (
             <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 ">
             {Array.from({ length: 6 }).map((_, i) => (
               <ProductSkeleton key={i} />
             ))}
           </div>
          ) : (
            <ProductGrid products={products} />
          )}

          {/* PAGINATION */}
          <ProductsPagination
            currentPage={data?.pagination.page ?? 1}
            totalPages={data?.pagination.totalPages ?? 1}
            onChange={setPage}
          />

        </div>
      </div>
    </div>
  );
}