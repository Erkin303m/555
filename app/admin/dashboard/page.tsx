"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Plus,
  LogOut,
  Pencil,
  Trash2,
  Search,
  PackageX,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Ushbu mahsulotni o'chirmoqchimisiz?")) return;
    setDeletingId(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  }

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors duration-200 shrink-0"
              aria-label="Ortga"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shrink-0">
              <LayoutDashboard
                className="w-5 h-5 text-white"
                strokeWidth={1.8}
              />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight">
                Boshqaruv paneli
              </h1>
              <p className="text-xs text-gray-400 leading-tight">
                {products.length} ta mahsulot
              </p>
            </div>
          </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin/add"
              className="bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 active:scale-[0.97] transition-all duration-200 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Mahsulot qo'shish</span>
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-100 active:scale-[0.97] transition-all duration-200 flex items-center gap-1.5 text-gray-600 disabled:opacity-50"
            >
              {loggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mahsulot yoki kategoriya bo'yicha qidirish..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black/10 focus:border-gray-400 outline-none transition-all duration-200"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-sm">Yuklanmoqda...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3 animate-[fadeInUp_0.4s_ease]">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                <PackageX className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-gray-500">
                {query ? "Hech narsa topilmadi" : "Hozircha mahsulotlar yo'q"}
              </p>
              {!query && (
                <Link
                  href="/admin/add"
                  className="text-sm text-black font-medium hover:underline flex items-center gap-1 mt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Birinchi mahsulotni qo'shing
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <table className="w-full hidden md:table">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-left">
                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Nomi
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Kategoriya
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Narx
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Holati
                    </th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => (
                    <tr
                      key={product.id}
                      className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/70 transition-colors duration-200 ${
                        deletingId === product.id ? "opacity-40" : ""
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            product.inStock
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {product.inStock ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {product.inStock ? "Mavjud" : "Tugagan"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/edit/${product.id}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                            title="Tahrirlash"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
                            title="O'chirish"
                          >
                            {deletingId === product.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-50">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className={`p-4 flex items-center justify-between gap-3 ${
                      deletingId === product.id ? "opacity-40" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">
                          {product.category}
                        </span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-sm font-medium text-gray-700">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                          product.inStock
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {product.inStock ? "Mavjud" : "Tugagan"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Link
                        href={`/admin/edit/${product.id}`}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {deletingId === product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
