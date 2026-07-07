"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Info,
  Tag,
  DollarSign,
  PackageCheck,
  FileText,
  Cpu,
  ImagePlus,
  X,
  Loader2,
  Save,
  Smartphone,
  ShieldCheck,
  Zap,
  Headphones,
  Cable,
  Sparkles,
} from "lucide-react";

const categories = [
  { value: "Phone", label: "iPhone", icon: Smartphone },
  { value: "Case", label: "Chexol", icon: ShieldCheck },
  { value: "Charger", label: "Zaryadlagich", icon: Zap },
  { value: "AirPods", label: "AirPods", icon: Headphones },
  { value: "Cable", label: "Kabel", icon: Cable },
  { value: "Accessory", label: "Aksessuar", icon: Sparkles },
];

const specLabels: Record<string, { label: string; placeholder: string }> = {
  ram: { label: "Operativ xotira (RAM)", placeholder: "masalan: 8GB" },
  storage: { label: "Xotira hajmi", placeholder: "masalan: 256GB" },
  processor: { label: "Protsessor", placeholder: "masalan: A17 Pro" },
  battery: { label: "Batareya holati", placeholder: "masalan: 78" },
};

interface Specs {
  ram?: string;
  storage?: string;
  processor?: string;
  battery?: string;
}

const defaultSpecs: Specs = {
  ram: "",
  storage: "",
  processor: "",
  battery: "",
};

interface Props {
  product?: {
    name?: string;
    category?: string;
    price?: number;
    description?: string;
    specs?: Specs;
    images?: string[];
    inStock?: boolean;
  };
  onSave: (data: Record<string, unknown>) => Promise<void>;
  saving?: boolean;
}

export default function ProductForm({ product, onSave, saving }: Props) {
  const router = useRouter();
  const [name, setName] = useState(product?.name || "");
  const [category, setCategory] = useState(product?.category || "Phone");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [description, setDescription] = useState(product?.description || "");
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [specs, setSpecs] = useState<Specs>({
    ...defaultSpecs,
    ...(product?.specs || {}),
  });
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [uploading, setUploading] = useState(false);

  const isPhone = category === "Phone";

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setImages((prev) => [...prev, reader.result as string]);
      setUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((i) => i !== url));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      name,
      category,
      price,
      description,
      inStock,
      specs: isPhone ? specs : {},
      images,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-9">
      {/* Asosiy ma'lumotlar */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">
            Asosiy ma'lumotlar
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mahsulot nomi
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="masalan: iPhone 15 Pro Max"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-gray-400 outline-none transition-all duration-200 text-sm"
              required
            />
          </div>

          {/* Category selector — chiroyli pill buttons */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              Kategoriya
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = category === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
                      active
                        ? "bg-black border-black text-white shadow-sm"
                        : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-gray-400" />
              Narxi ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-gray-400 outline-none transition-all duration-200 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5 text-gray-400" />
              Ombordagi holati
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setInStock(true)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  inStock
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                Mavjud
              </button>
              <button
                type="button"
                onClick={() => setInStock(false)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  !inStock
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                Tugagan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tavsif */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">Tavsif</h3>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Mahsulot haqida qisqacha ma'lumot yozing..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-gray-400 outline-none transition-all duration-200 resize-y text-sm leading-relaxed"
        />
      </div>

      {/* Xususiyatlar — faqat iPhone tanlanganda ko'rinadi */}
      {isPhone && (
        <div className="animate-[fadeInUp_0.35s_ease] bg-gray-50/70 border border-gray-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-900">
              Texnik xususiyatlar
            </h3>
            <span className="text-[11px] text-gray-400 font-normal ml-auto">
              Faqat iPhone uchun
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(specs).map(([key, val]) => {
              const meta = specLabels[key] || { label: key, placeholder: "" };
              const isBattery = key === "battery";
              return (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    {meta.label}
                  </label>
                  <div className="relative">
                    <input
                      type={isBattery ? "number" : "text"}
                      min={isBattery ? 0 : undefined}
                      max={isBattery ? 100 : undefined}
                      value={val as string}
                      onChange={(e) =>
                        setSpecs((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                      placeholder={meta.placeholder}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/10 focus:border-gray-400 outline-none transition-all duration-200 text-sm"
                    />
                    {isBattery && (
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                        %
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Rasmlar */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ImagePlus className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">Rasmlar</h3>
        </div>

        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {images.map((url, i) => (
              <div
                key={i}
                className="relative group animate-[fadeInUp_0.3s_ease]"
              >
                <img
                  src={url}
                  alt=""
                  className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors duration-200 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          className={`inline-flex items-center gap-2 px-4 py-2.5 border border-dashed rounded-xl cursor-pointer transition-all duration-200 text-sm font-medium ${
            uploading
              ? "border-gray-200 text-gray-400 cursor-wait"
              : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Yuklanmoqda...
            </>
          ) : (
            <>
              <ImagePlus className="w-4 h-4" />
              Rasm tanlash
            </>
          )}
        </label>
      </div>

      {/* Amallar */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-6 py-2.5 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saqlanmoqda...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Mahsulotni saqlash
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard")}
          className="px-6 py-2.5 rounded-xl font-medium border border-gray-200 hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 text-gray-600"
        >
          Bekor qilish
        </button>
      </div>
    </form>
  );
}
