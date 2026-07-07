import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { Smartphone, Camera, Send, Phone } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "555 | Premium iPhone va Aksessuarlar",
  description:
    "iPhone va original aksessuarlarni O'zbekistonda eng qulay narxlarda xarid qiling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#fafafa] text-gray-900 font-sans selection:bg-black selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-100 bg-white mt-24">
          <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
                  <Smartphone
                    className="w-4 h-4 text-white"
                    strokeWidth={2.2}
                  />
                </div>
                <span className="font-semibold tracking-tight text-lg">
                  iShop
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Original iPhone va aksessuarlar — ishonchli va tez yetkazib
                berish bilan.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-900">
                Aloqa
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +998 90 123 45 67
                </li>
                <li className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> @555_support
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-900">
                Ijtimoiy tarmoqlar
              </h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
                >
                  <Camera className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} 555. Barcha huquqlar himoyalangan.
          </div>
        </footer>
      </body>
    </html>
  );
}
