import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "./ProductCard";
import {
  ArrowRight,
  Smartphone,
  ShieldCheck,
  Zap,
  Headphones,
  Cable,
  Sparkles,
  Truck,
  BadgeCheck,
  RotateCcw,
} from "lucide-react";

const categories = [
  { key: "Phone", label: "iPhone", icon: Smartphone },
  { key: "Case", label: "Chexollar", icon: ShieldCheck },
  { key: "Charger", label: "Zaryadlagichlar", icon: Zap },
  { key: "AirPods", label: "AirPods", icon: Headphones },
  { key: "Cable", label: "Kabellar", icon: Cable },
  { key: "Accessory", label: "Aksessuarlar", icon: Sparkles },
];

const perks = [
  {
    icon: Truck,
    title: "Tezkor yetkazib berish",
    desc: "Sirdaryo bo'ylab 1-2 kunda",
  },
  {
    icon: BadgeCheck,
    title: "100% original",
    desc: "Kafolatlangan mahsulotlar",
  },
  {
    icon: RotateCcw,
    title: "Qaytarish kafolati",
    desc: "Yo'q",
  },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium mb-6 animate-[fadeInUp_0.6s_ease]">
            <Sparkles className="w-3.5 h-3.5" />
            Yangi to'plam keldi
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.1] animate-[fadeInUp_0.6s_ease_0.1s_backwards]">
            555 - Premium iPhone va
            <br />
            <span className="text-gray-400">Aksessuarlar</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-9 max-w-xl leading-relaxed animate-[fadeInUp_0.6s_ease_0.2s_backwards]">
            Eng so'nggi iPhone modellari va original aksessuarlarni kashf eting.
            Sifat kafolati, tezkor yetkazib berish bilan.
          </p>

          <div className="flex flex-wrap gap-3 animate-[fadeInUp_0.6s_ease_0.3s_backwards]">
            <a
              href="tel:+998902420757"
              className="group bg-white text-black px-6 py-3.5 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
            >
              Xarid qilish
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              href="/products?category=Phone"
              className="border border-white/20 text-white px-6 py-3.5 rounded-2xl font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              iPhone'larni ko'rish
            </Link>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.8} />
              </div>
              <div>
                <div className="font-medium text-sm text-gray-900">{title}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Tavsiya etilgan mahsulotlar
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Eng ommabop va yangi qo'shilgan mahsulotlar
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black transition-colors group shrink-0"
          >
            Barchasini ko'rish
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Hozircha mahsulotlar mavjud emas
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="animate-[fadeInUp_0.5s_ease_backwards]"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <Link
          href="/products"
          className="sm:hidden mt-8 flex items-center justify-center gap-1 text-sm font-medium text-gray-600"
        >
          Barchasini ko'rish
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* CATEGORIES */}
      <section className="bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Kategoriyalar bo'yicha xarid qiling
            </h2>
            <p className="text-gray-500 text-sm">
              Sizga kerakli bo'limni tanlang
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(({ key, label, icon: Icon }) => (
              <Link
                key={key}
                href={`/products?category=${key}`}
                className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                  <Icon
                    className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="font-medium text-sm text-gray-900">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
