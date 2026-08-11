import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dad's Kitchen — Mens Philanthropy Foundation",
    template: "%s — Dad's Kitchen",
  },
  description:
    "Where dads and kids cook side by side and talk face to face. A 501(c)(3) dedicated to strengthening fatherhood through cooking and conversation.",
  metadataBase: new URL("https://dadskitchen.org"),
  openGraph: {
    siteName: "Dad's Kitchen",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
