import {
  BookOpen01Icon,
  Folder01Icon,
  LayoutGridIcon,
} from "@hugeicons/core-free-icons";
import { Link } from "@inertiajs/react";

import type { NavItem } from "@/types";

import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboard } from "@/routes";

import AppLogo from "./app-logo";

const mainNavItems: NavItem[] = [
  {
    href: dashboard(),
    icon: LayoutGridIcon,
    title: "Dashboard",
  },
];

const footerNavItems: NavItem[] = [
  {
    href: "https://github.com/laravel/react-starter-kit",
    icon: Folder01Icon,
    title: "Repository",
  },
  {
    href: "https://laravel.com/docs/starter-kits#react",
    icon: BookOpen01Icon,
    title: "Documentation",
  },
];

export const AppSidebar = () => (
  <Sidebar collapsible="icon" variant="inset">
    <AppSidebarHeader />
    <AppSidebarMain />
    <AppSidebarFooter />
  </Sidebar>
);

const AppSidebarHeader = () => (
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarLogoLink />
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
);

const SidebarLogoLink = () => (
  <SidebarMenuButton size="lg" render={<Link href={dashboard()} prefetch />}>
    <AppLogo />
  </SidebarMenuButton>
);

const AppSidebarMain = () => (
  <SidebarContent>
    <NavMain items={mainNavItems} />
  </SidebarContent>
);

const AppSidebarFooter = () => (
  <SidebarFooter>
    <NavFooter items={footerNavItems} className="mt-auto" />
    <NavUser />
  </SidebarFooter>
);
