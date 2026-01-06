import { usePage } from "@inertiajs/react";
import { ChevronsUpDown } from "lucide-react";

import type { SharedData } from "@/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserInfo } from "@/components/user-info";
import { UserMenuContent } from "@/components/user-menu-content";
import { useIsMobile } from "@/hooks/use-mobile";

const collapsedSide = "left" as const;
const mobileSide = "bottom" as const;

export const NavUser = () => {
  const { auth } = usePage<SharedData>().props;
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <NavUserMenu user={auth.user} menuState={state} isMobile={isMobile} />
    </SidebarMenu>
  );
};

const NavUserMenu = ({
  user,
  menuState,
  isMobile,
}: {
  user: SharedData["auth"]["user"];
  menuState: "expanded" | "collapsed";
  isMobile: boolean;
}) => (
  <SidebarMenuItem>
    <NavUserDropdown user={user} menuState={menuState} isMobile={isMobile} />
  </SidebarMenuItem>
);

const NavUserDropdown = ({
  user,
  menuState,
  isMobile,
}: {
  user: SharedData["auth"]["user"];
  menuState: "expanded" | "collapsed";
  isMobile: boolean;
}) => (
  <DropdownMenu>
    <NavUserTrigger user={user} />
    <NavUserContent user={user} menuState={menuState} isMobile={isMobile} />
  </DropdownMenu>
);

const NavUserTrigger = ({ user }: { user: SharedData["auth"]["user"] }) => (
  <DropdownMenuTrigger asChild>
    <NavUserButton user={user} />
  </DropdownMenuTrigger>
);

const NavUserButton = ({ user }: { user: SharedData["auth"]["user"] }) => (
  <SidebarMenuButton
    size="lg"
    className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
    data-test="sidebar-menu-button"
  >
    <NavUserButtonContent user={user} />
  </SidebarMenuButton>
);

const NavUserButtonContent = ({
  user,
}: {
  user: SharedData["auth"]["user"];
}) => (
  <span className="flex w-full items-center gap-2">
    <UserInfo user={user} />
    <ChevronsUpDown className="ml-auto size-4" />
  </span>
);

const NavUserContent = ({
  user,
  menuState,
  isMobile,
}: {
  user: SharedData["auth"]["user"];
  menuState: "expanded" | "collapsed";
  isMobile: boolean;
}) => {
  const side = isMobile ? mobileSide : getDesktopSide(menuState);

  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      align="end"
      side={side}
    >
      <UserMenuContent user={user} />
    </DropdownMenuContent>
  );
};

const getDesktopSide = (menuState: "expanded" | "collapsed") =>
  menuState === "collapsed" ? collapsedSide : mobileSide;
