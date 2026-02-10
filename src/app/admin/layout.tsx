import type { Metadata } from "next";
import AdminAuth from "@/components/admin/AdminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";

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
      <AdminSidebar>{children}</AdminSidebar>
    </AdminAuth>
  );
}
