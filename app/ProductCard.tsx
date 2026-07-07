import Link from "next/link";
import { BatteryMedium, Smartphone } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string | string[];
  specs?: string | { battery?: string; [key: string]: unknown };
  inStock: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const images =
    typeof product.images === "string"
      ? JSON.parse(product.images || "[]")
      : product.images;

  const specs =
    typeof product.specs === "string"
      ? JSON.parse(product.specs || "{}")
      : product.specs;

  const battery = specs?.battery;
  const cover = images?.[0];

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-[#f7f7f8] rounded-3xl p-3.5 border border-black/[0.03] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square rounded-2xl bg-white overflow-hidden mb-3.5">
        {cover ? (
          <img
            src={cover}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200">
            <Smartphone className="w-10 h-10" strokeWidth={1.2} />
          </div>
        )}

        {!product.inStock && (
          <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
            Tugagan
          </span>
        )}

        {battery && (
          <span className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-medium px-2 py-1 rounded-full shadow-sm">
            <BatteryMedium className="w-3 h-3" />
            {battery}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-1">
        <p className="text-[11px] text-gray-400 font-medium mb-0.5">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 truncate mb-1.5">
          {product.name}
        </h3>
        <p className="text-base font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
