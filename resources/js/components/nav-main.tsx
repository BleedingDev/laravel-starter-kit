import { Link, usePage } from "@inertiajs/react";

import type { NavItem } from "@/types";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const NavMain = ({ items = [] }: { items: NavItem[] }) => {
  const page = usePage();

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavMainItem key={item.title} item={item} currentPath={page.url} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

const NavMainItem = ({
  item,
  currentPath,
}: {
  item: NavItem;
  currentPath: string;
}) => (
  <SidebarMenuItem>
    <SidebarMenuButton
      asChild
      isActive={isNavItemActive(item, currentPath)}
      tooltip={{ children: item.title }}
    >
      <NavMainLink item={item} />
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const NavMainLink = ({ item }: { item: NavItem }) => (
  <Link href={item.href} prefetch>
    <NavMainLabel item={item} />
  </Link>
);

const NavMainLabel = ({ item }: { item: NavItem }) => (
  <span className="flex items-center gap-2">
    {item.icon ? <item.icon /> : null}
    <span>{item.title}</span>
  </span>
);

const isNavItemActive = (item: NavItem, currentPath: string) =>
  currentPath.startsWith(
    typeof item.href === "string" ? item.href : item.href.url
  );
