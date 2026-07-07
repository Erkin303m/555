import { prisma } from "@/lib/prisma";
import ProductCard from "../ProductCard";
import {
  Search,
  Smartphone,
  ShieldCheck,
  Zap,
  Headphones,
  Cable,
  Sparkles,
  LayoutGrid,
  PackageX,
} from "lucide-react";

const categories = [
  { value: "all", label: "Barchasi", icon: LayoutGrid },
  { value: "Phone", label: "iPhone", icon: Smartphone },
  { value: "Case", label: "Chexol", icon: ShieldCheck },
  { value: "Charger", label: "Zaryadlagich", icon: Zap },
  { value: "AirPods", label: "AirPods", icon: Headphones },
  { value: "Cable", label: "Kabel", icon: Cable },
  { value: "Accessory", label: "Aksessuar", icon: Sparkles },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  const where: Record<string, unknown> = {};
  if (category && category !== "all") where.category = category;
  if (search) where.name = { contains: search };

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Mahsulotlar
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {products.length} ta mahsulot topildi
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active =
              (cat.value === "all" && !category) || cat.value === category;
            return (
              <a
                key={cat.value}
                href={
                  cat.value === "all"
                    ? "/products"
                    : `/products?category=${cat.value}`
                }
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  active
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                {cat.label}
              </a>
            );
          })}
        </div>

        <form method="GET" action="/products" className="sm:ml-auto">
          {category && <input type="hidden" name="category" value={category} />}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="Mahsulot qidirish..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-gray-400 outline-none transition-all duration-200 text-sm"
            />
          </div>
        </form>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-[fadeInUp_0.4s_ease]">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <PackageX className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
          </div>
          <p className="text-gray-700 font-medium mb-1">
            Mahsulotlar topilmadi
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Boshqa kategoriya yoki qidiruv so'zini sinab ko'ring
          </p>
          <a
            href="/products"
            className="text-sm font-medium text-black hover:underline"
          >
            Filtrlarni tozalash
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="animate-[fadeInUp_0.4s_ease_backwards]"
              style={{ animationDelay: `${Math.min(i * 0.05, 0.3)}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
