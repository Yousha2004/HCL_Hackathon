"use client";
import {
  Bell,
  BookCheck,
  Briefcase,
  CalendarDays,
  Clipboard,
  Home,
  Settings2,
  UserPen,
  Table2,
  Search,
} from "lucide-react";
import { AppSidebar, SidebarProps } from "./app-sidebar";
import { useMemo } from "react";

export const sidebarData: SidebarProps = {
  subTitle: "HealthHub",
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
  ],
  navSecondary: [],
};

export function MainSidebar({
  user,
}: {
  user: {
    name: string;
    email: string;
    image?: string;
  };
}) {

  return (
    <AppSidebar collapsible="icon" {...sidebarData} user={user} />
  );
}