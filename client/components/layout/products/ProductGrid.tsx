import ProductCard from "./ProductCard";

type Product = {
  _id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  description: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard
          key={product._id}
          {...product}
        />
      ))}
    </div>
  );
}