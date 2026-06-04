"use client";

import { use, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft } from "lucide-react";

import { useProduct } from "@/features/products/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import ProductPageSkeleton from "@/features/products/components/ProductPageSkeleton";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isLoading, isError } = useProduct(id);

  /*  ZOOM STATE  */
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  /*  LOADING  */
  if (isLoading) {
    return (
      <ProductPageSkeleton />
    );
  }

  /*  ERROR  */
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-10 text-center">
          Product not found
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="">

        {/* BACK */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg mb-6
          bg-muted/40 hover:bg-muted 
          text-muted-foreground hover:text-primary 
          transition w-fit"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/*  IMAGE  */}
          <div className="relative">

            {/* MAIN IMAGE */}
            <div
              ref={imageRef}
              className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-muted/20 border"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />

              {/* CURSOR LENS */}
              {showZoom && (
                <div
                  className="hidden lg:block absolute w-28 h-28 border-2 border-white/80 bg-white/10 backdrop-blur-sm pointer-events-none"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </div>

            {/* FLOATING ZOOM CARD (DESKTOP ONLY) */}
            {showZoom && (
              <div className="hidden lg:block absolute left-[105%] top-0 w-[420px] h-[450px] rounded-2xl border bg-background shadow-2xl overflow-hidden z-50">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: "250%",
                    backgroundPosition: `${position.x}% ${position.y}%`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
            )}
          </div>

          {/*  DETAILS  */}
          <div className="space-y-6">

            <Badge className="bg-primary/10 text-primary">
              {product.category}
            </Badge>

            <h1 className="text-3xl font-semibold">
              {product.title}
            </h1>

            <span className="text-4xl font-bold text-primary">
              ${product.price}
            </span>

            <Separator />

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <Separator />

            <Button size="lg" className="w-full gap-2">
              <ShoppingCart size={16} />
              Add to Cart
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}