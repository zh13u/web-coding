import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],  // ho tro bo ky tu latin 
  display: "swap",
});

export const metadata: Metadata = {
  title: "PhoneStore - Cửa hàng điện thoại uy tín",
  description:
    "Cửa hàng điện thoại uy tín với hơn 10 năm kinh nghiệm. Khám phá bộ sưu tập điện thoại mới nhất với công nghệ tiên tiến và giá cả hợp lý.",
};

// “Em cấu hình metadata trong layout.tsx để Next.js sinh ra <title> và <meta description> cho toàn bộ website PhoneStore, hỗ trợ SEO tốt hơn.”
// SEO : Search Engine Optimization : lam cho website de duoc google xde xuat 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
