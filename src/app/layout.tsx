import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PhoneStore - Cửa hàng điện thoại uy tín",
  description:
    "Cửa hàng điện thoại uy tín với hơn 10 năm kinh nghiệm. Khám phá bộ sưu tập điện thoại mới nhất với công nghệ tiên tiến và giá cả hợp lý.",
};

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
