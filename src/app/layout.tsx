import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Prozilli Gaming — Live Entertainment & Gaming",
    template: "%s | Prozilli Gaming",
  },
  description:
    "Multi-platform live streaming, AI-powered entertainment, FiveM roleplay, and community — powered by PRISMAI. Join the Prozilli ecosystem.",
  metadataBase: new URL("https://prozilligaming.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Prozilli Gaming",
    title: "Prozilli Gaming — Live Entertainment & Gaming",
    description:
      "Multi-platform live streaming, AI-powered entertainment, and next-gen gaming experiences.",
    images: [{ url: "/images/heroes/hero-home.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ProzilliGaming",
    creator: "@ProzilliGaming",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-void text-foreground antialiased">
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
