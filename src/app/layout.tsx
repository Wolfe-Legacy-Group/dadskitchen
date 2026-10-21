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

// No EIN or address until DK-15 supplies them.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Mens Philanthropy Foundation",
  alternateName: "Dad's Kitchen",
  url: "https://dadskitchen.org",
  logo: "https://dadskitchen.org/logo.png",
  description:
    "A 501(c)(3) nonprofit dedicated to strengthening fatherhood through cooking and conversation. Dad's Kitchen is where dads and kids cook side by side and talk face to face.",
  sameAs: [
    "https://instagram.com/dadskitchenorg",
    "https://tiktok.com/@dadskitchenorg",
    "https://facebook.com/dadskitchenorg",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
