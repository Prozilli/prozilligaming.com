import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stream Schedule",
  description:
    "ProzilliGaming weekly stream schedule. Know when to catch live streams across 9 platforms. GTA V RP, variety gaming, community nights, and more.",
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
