import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product._id}` }
      className="group block h-full"
      prefetch={false}
    >
      <Card className="h-full overflow-hidden border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

        {/* IMAGE */}
        <div className="px-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* category badge */}
            {product.category && (
              <div className="absolute left-2 top-2 z-10">
                <span className="rounded-md bg-background/90 backdrop-blur px-2 py-1 text-[11px] font-semibold uppercase shadow-sm">
                  {product.category}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <CardContent className="flex flex-col justify-between px-5 pt-0 space-y-3">

          {/* title + price */}
          <div className="space-y-1">
            <h3 className="line-clamp-1 text-base font-semibold group-hover:text-primary transition">
              {product.title}
            </h3>

            <p className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* ADD TO CART */}
          <Button
            size="sm"
            className="w-full gap-2 mt-2 p-5 rounded-3xl"
            onClick={(e) => {
              e.preventDefault(); // prevents navigation to details page
              e.stopPropagation();
              console.log("Add to cart:", product._id);
            }}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>

        </CardContent>
      </Card>
    </Link>
  );
}