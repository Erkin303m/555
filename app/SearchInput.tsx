"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set("search", value);
      else params.delete("search");
      router.push(`/products?${params.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative">
      <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Mahsulot qidirish..."
        className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-gray-400 outline-none transition-all duration-200 text-sm"
      />
    </div>
  );
}
