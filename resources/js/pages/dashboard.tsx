import { Head } from "@inertiajs/react";

import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";

interface BreadcrumbItem {
  title: string;
  href: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    href: dashboard().url,
    title: "Dashboard",
  },
];

const Dashboard = () => (
  <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Dashboard" />
    <DashboardContent />
  </AppLayout>
);

const DashboardContent = () => (
  <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <DashboardGrid />
    <DashboardPanel />
  </div>
);

const DashboardGrid = () => (
  <div className="grid auto-rows-min gap-4 md:grid-cols-3">
    <DashboardCard />
    <DashboardCard />
    <DashboardCard />
  </div>
);

const DashboardCard = () => (
  <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
  </div>
);

const DashboardPanel = () => (
  <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
  </div>
);
export default Dashboard;
