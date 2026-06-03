"use client";

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  categories: string[];
};

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories
}: Props) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label>Search</Label>
        <Input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div>
        <Label>Category</Label>
        <RadioGroup value={category} onValueChange={setCategory}>
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="" id="all" />
              <Label htmlFor="all">All</Label>
            </div>

            {categories.map(cat => (
              <div key={cat} className="flex items-center gap-2">
                <RadioGroupItem value={cat} id={cat} />
                <Label htmlFor={cat}>{cat}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Sort */}
      <div>
        <Label>Sort by price</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Low → High</SelectItem>
            <SelectItem value="desc">High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}