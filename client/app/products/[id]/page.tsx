"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Star, Shield, Truck } from "lucide-react";

import { useProduct } from "@/features/products/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf8]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-stone-300 border-t-stone-800 animate-spin" />
          <p className="text-sm text-stone-400 tracking-widest uppercase">
            Loading
          </p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf8]">
        <div className="text-center space-y-3">
          <p className="text-5xl">✦</p>
          <h2 className="text-xl font-semibold text-stone-700">
            Product not found
          </h2>
          <Link
            href="/"
            className="text-sm text-stone-400 hover:text-stone-700 underline underline-offset-4 transition-colors"
          >
            Return to catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="flex items-center gap-3">
        <button className="group flex items-center gap-2 text-sm text-stone-600 border border-stone-200 px-3 py-2 rounded-lg bg-white transition-all duration-300 hover:bg-stone-100 hover:border-stone-300 hover:text-stone-900">
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span>Back</span>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="py-10">
        {/* GRID — using inline styles as fallback alongside Tailwind to guarantee 2-col layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
          className="grid-cols-1 sm:grid-cols-2"
        >
          {/* ─── IMAGE PANEL ─── */}
          <div className="space-y-4">
            {/* Main image */}
            <div
              className="relative overflow-hidden rounded-2xl bg-stone-100"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-contain p-10 transition-transform duration-700 hover:scale-105 rounded-2xl"
                priority
              />
            </div>
          </div>

          {/* ─── DETAILS PANEL ─── */}
          <div className="space-y-7 pt-2">
            {/* Category + rating row */}
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="capitalize text-xs tracking-widest border-stone-300 text-stone-500 rounded-full px-3 py-1"
              >
                {product.category}
              </Badge>
            </div>

            {/* Title */}
            <h1
              className="text-3xl leading-snug font-semibold text-stone-800"
              style={{
                fontFamily: "'Georgia', serif",
                letterSpacing: "-0.01em",
              }}
            >
              {product.title}
            </h1>

            {/* Price block */}
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-stone-900">
                ${product.price}
              </span>
            </div>

            <Separator className="bg-stone-200" />

            {/* Description */}
            <div>
              <h2
                className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mb-3"
                style={{ fontFamily: "sans-serif" }}
              >
                About this item
              </h2>
              <p
                className="text-stone-600 leading-relaxed text-[15px]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {product.description}
              </p>
            </div>

            <Separator className="bg-stone-200" />

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full gap-3 bg-stone-900 hover:bg-stone-700 text-white rounded-xl py-6 text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:shadow-stone-900/20 active:scale-[0.98]"
                style={{ fontFamily: "sans-serif" }}
              >
                <ShoppingCart size={16} strokeWidth={1.8} />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
