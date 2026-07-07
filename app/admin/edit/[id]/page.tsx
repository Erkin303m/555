"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PencilLine, AlertCircle, Loader2 } from "lucide-react";
import ProductForm from "../../ProductForm";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setProduct({
          ...data,
          specs:
            typeof data.specs === "string"
              ? JSON.parse(data.specs)
              : data.specs,
          images:
            typeof data.images === "string"
              ? JSON.parse(data.images)
              : data.images,
        });
      })
      .catch(() => setLoadError(true));
  }, [params.id]);

  async function handleSave(data: Record<string, unknown>) {
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError("O'zgarishlarni saqlashda xatolik yuz berdi");
        setSaving(false);
      }
    } catch {
      setError("Server bilan bog'lanishda xatolik yuz berdi");
      setSaving(false);
    }
  }

  if (loadError)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center animate-[fadeInUp_0.4s_ease]">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-gray-700 font-medium mb-1">Mahsulot topilmadi</p>
          <p className="text-sm text-gray-400 mb-5">
            Ushbu mahsulot mavjud emas yoki o'chirilgan
          </p>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Boshqaruv paneliga qaytish
          </Link>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center gap-2 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin" />
        <p className="text-sm">Yuklanmoqda...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Boshqaruv paneliga qaytish
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
              <PencilLine className="w-5 h-5 text-white" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight">
                Mahsulotni tahrirlash
              </h1>
              <p className="text-xs text-gray-400 leading-tight truncate max-w-[240px] sm:max-w-none">
                {String(product.name ?? "")}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 animate-[fadeInUp_0.3s_ease]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 animate-[fadeInUp_0.4s_ease]">
          <ProductForm product={product} onSave={handleSave} saving={saving} />
        </div>
      </main>
    </div>
  );
}
