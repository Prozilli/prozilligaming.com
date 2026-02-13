import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/shop/CartDrawer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#910000",
};

export const metadata: Metadata = {
  title: {
    default: "Prozilli Gaming — Live. Create. Dominate.",
    template: "%s | Prozilli Gaming",
  },
  description:
    "Multiplatform live streaming across Twitch, YouTube, Kick, Trovo, and Facebook. Gaming, creative content, and community. Part of the Prozilli Entertainment ecosystem.",
  keywords: [
    "Prozilli Gaming",
    "live streaming",
    "Twitch streamer",
    "multiplatform streaming",
    "gaming content creator",
    "Prozilli Entertainment",
    "YouTube gaming",
    "Kick streamer",
  ],
  authors: [{ name: "Prozilli Gaming", url: "https://prozilligaming.com" }],
  creator: "Prozilli Gaming",
  publisher: "Prozilli Inc.",
  metadataBase: new URL("https://prozilligaming.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Prozilli Gaming",
    title: "Prozilli Gaming — Live. Create. Dominate.",
    description:
      "Multiplatform live streaming across Twitch, YouTube, Kick, Trovo, and Facebook. Gaming, creative content, and community.",
    type: "website",
    locale: "en_US",
    url: "https://prozilligaming.com",
    images: [
      {
        url: "/images/heroes/hero-home.png",
        width: 1200,
        height: 630,
        alt: "Prozilli Gaming - Live. Create. Dominate.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prozilli Gaming — Live. Create. Dominate.",
    description: "Multiplatform live streaming across Twitch, YouTube, Kick, Trovo, and Facebook.",
    creator: "@ProzilliGaming",
    images: ["/images/heroes/hero-home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  category: "entertainment",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Prozilli Gaming",
  url: "https://prozilligaming.com",
  description:
    "Official site for Prozilli Gaming — live streams, gaming content, and community.",
  publisher: {
    "@type": "Organization",
    name: "Prozilli Entertainment",
    url: "https://prozilli.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <Navbar />
          <ErrorBoundary>
            <main id="main-content" role="main" className="min-h-screen pt-14 sm:pt-16">
              {children}
            </main>
          </ErrorBoundary>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
