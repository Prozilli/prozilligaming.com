import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest news, updates, and behind-the-scenes content from Prozilli Gaming. LISA updates, ZO Syndicate news, merch drops, and more.",
  alternates: {
    types: {
      "application/rss+xml": "/api/prismai/blog/rss",
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
