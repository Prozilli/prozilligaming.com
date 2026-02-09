import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import AdminAuth from "@/components/admin/AdminAuth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "PRISMAI admin dashboard for Prozilli Gaming",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuth>
      <AdminNav />
      {children}
    </AdminAuth>
  );
}
