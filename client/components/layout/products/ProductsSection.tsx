"use client";

import { useState, useMemo } from "react";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";

export default function ProductsSection({ products }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (sort === "asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <section className="container py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters */}
      <aside className="lg:col-span-1">
        <ProductFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          categories={categories}
        />
      </aside>

      {/* Products */}
      <main className="lg:col-span-3">
        <ProductGrid products={filteredProducts} />
      </main>
    </section>
  );
}