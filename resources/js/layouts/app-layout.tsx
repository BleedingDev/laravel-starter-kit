import type { ReactNode } from "react";

import type { BreadcrumbItem } from "@/types";

import AppLayoutTemplate from "@/layouts/app/app-sidebar-layout";

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
    {children}
  </AppLayoutTemplate>
);

export default AppLayout;
