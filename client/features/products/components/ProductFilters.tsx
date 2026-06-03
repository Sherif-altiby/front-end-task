"use client";

import { Input } from "@/components/ui/input";
import { ArrowDownWideNarrow } from "lucide-react";

const categories = [
  "all",
  "electronics",
  "fashion",
  "home",
  "sports",
  "books",
];

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}: Props) {
  return (
    <aside className="h-fit w-full lg:sticky lg:top-24">
      <div className="rounded-xl border bg-background p-5 shadow-sm space-y-6">

        {/* SEARCH */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Search
          </h3>

          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10"
          />
        </div>

        {/* CATEGORIES */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Categories
          </h3>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => {
              const isActive = category === item;

              const label =
                item === "all"
                  ? "All"
                  : item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-3 py-1 text-sm border transition
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted"
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SORT */}
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <ArrowDownWideNarrow size={16} />
            Sort By Price
          </h3>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setSort("low")}
              className={`rounded-md px-3 py-2 text-sm border transition text-left
                ${
                  sort === "low"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted"
                }
              `}
            >
              Lowest First
            </button>

            <button
              type="button"
              onClick={() => setSort("high")}
              className={`rounded-md px-3 py-2 text-sm border transition text-left
                ${
                  sort === "high"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted"
                }
              `}
            >
              Highest First
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
}