import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "Support Prozilli with donations and memberships. Every contribution fuels better content, gear, and community.",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
