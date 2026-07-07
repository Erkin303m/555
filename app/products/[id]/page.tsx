import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Cpu,
  ListChecks,
  Phone,
} from "lucide-react";
import ProductGallery from "./ProductGallery";

const specLabels: Record<string, string> = {
  ram: "Operativ xotira (RAM)",
  storage: "Xotira hajmi",
  processor: "Protsessor",
  battery: "Batareya holati",
};

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) notFound();

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) notFound();

  const images: string[] = JSON.parse(product.images);
  const specs: Record<string, string> = JSON.parse(product.specs || "{}");
  const hasSpecs = Object.values(specs).some((v) => v);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Mahsulotlarga qaytish
      </Link>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery images={images} name={product.name} />

        <div>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1.5 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-5">
            <p className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>

            {product.inStock ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mavjud
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full">
                <XCircle className="w-3.5 h-3.5" />
                Tugagan
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-7 text-[15px]">
              {product.description}
            </p>
          )}

          <a
            href="tel:+998901234567"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3.5 rounded-2xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 mb-8"
          >
            <Phone className="w-4 h-4" />
            Buyurtma berish
          </a>

          {hasSpecs && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-gray-400" />
                <h2 className="text-base font-semibold text-gray-900">
                  Texnik xususiyatlar
                </h2>
              </div>
              <div className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/50">
                {Object.entries(specs).map(([key, value]) =>
                  value ? (
                    <div
                      key={key}
                      className="flex border-b border-gray-100 last:border-0"
                    >
                      <span className="w-2/5 px-4 py-3 text-sm font-medium text-gray-500 bg-gray-50">
                        {specLabels[key] || key}
                      </span>
                      <span className="w-3/5 px-4 py-3 text-sm text-gray-900 font-medium">
                        {key === "battery" ? `${value}%` : value}
                      </span>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          )}

          {!hasSpecs && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <ListChecks className="w-4 h-4" />
              Ushbu mahsulot uchun qo'shimcha xususiyatlar mavjud emas
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
