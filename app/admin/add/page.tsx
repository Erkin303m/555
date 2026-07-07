"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PackagePlus, AlertCircle } from "lucide-react";
import ProductForm from "../ProductForm";

export default function AddProduct() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(data: Record<string, unknown>) {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError("Mahsulotni saqlashda xatolik yuz berdi");
        setSaving(false);
      }
    } catch {
      setError("Server bilan bog'lanishda xatolik yuz berdi");
      setSaving(false);
    }
  }

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
              <PackagePlus className="w-5 h-5 text-white" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight">
                Yangi mahsulot qo'shish
              </h1>
              <p className="text-xs text-gray-400 leading-tight">
                Mahsulot ma'lumotlarini to'ldiring
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
          <ProductForm onSave={handleSave} saving={saving} />
        </div>
      </main>
    </div>
  );
}
