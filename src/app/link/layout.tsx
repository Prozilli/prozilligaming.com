import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Link Your Accounts",
  description:
    "Connect your streaming and social accounts to create a unified identity across all platforms. LISA will recognize you everywhere.",
  openGraph: {
    title: "Link Your Accounts | Prozilli Gaming",
    description:
      "Connect your streaming and social accounts to create a unified identity across all platforms. LISA will recognize you everywhere.",
    type: "website",
    url: "https://prozilligaming.com/link",
    siteName: "Prozilli Gaming",
  },
  twitter: {
    card: "summary_large_image",
    title: "Link Your Accounts | Prozilli Gaming",
    description:
      "Connect your streaming and social accounts to create a unified identity across all platforms. LISA will recognize you everywhere.",
  },
  alternates: {
    canonical: "https://prozilligaming.com/link",
  },
};

export default function LinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
