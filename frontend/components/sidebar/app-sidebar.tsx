"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export type SidebarProps = {
  subTitle: string;
  navMain: {
    title: string;
    url: string;
    icon: LucideIcon;
    enabled?: (hasPermissionFor: (permission: string) => boolean) => boolean;
    items?: {
      title: string;
      url: string;
      rel?: string;
      target?: string;
      enabled?: (hasPermissionFor: (permission: string) => boolean) => boolean;
    }[];
  }[];
  navSecondary: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
};
export function AppSidebar({
  subTitle,
  navMain,
  navSecondary,
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> &
  SidebarProps & { user: { name: string; email: string; image?: string } }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    width={1200}
                    height={1200}
                    className="h-full w-full"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">T&P NSUT</span>
                  <span className="truncate text-xs">{subTitle}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center justify-between">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}