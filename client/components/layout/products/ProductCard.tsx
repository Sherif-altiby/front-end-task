import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type ProductCardProps = {
  title: string;
  image: string;
  category: string;
  price: number;
  description: string;
};

export default function ProductCard({
  title,
  image,
  category,
  price,
  description
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="h-48 w-full object-cover"
      />

      <CardContent className="p-4 space-y-2">
        <span className="text-xs text-muted-foreground uppercase">
          {category}
        </span>

        <h3 className="font-semibold text-lg line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="font-bold text-primary">
          ${price.toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
}