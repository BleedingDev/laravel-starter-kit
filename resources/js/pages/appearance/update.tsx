import { Head } from "@inertiajs/react";

import AppearanceTabs from "@/components/appearance-tabs";
import HeadingSmall from "@/components/heading-small";
import AppLayout from "@/layouts/app-layout";
import SettingsLayout from "@/layouts/settings/layout";
import { edit as editAppearance } from "@/routes/appearance";

interface BreadcrumbItem {
  title: string;
  href: string;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    href: editAppearance().url,
    title: "Appearance settings",
  },
];

const Update = () => (
  <AppLayout breadcrumbs={breadcrumbs}>
    <Head title="Appearance settings" />
    <UpdateContent />
  </AppLayout>
);
export default Update;

const UpdateContent = () => (
  <SettingsLayout>
    <AppearanceContent />
  </SettingsLayout>
);

const AppearanceContent = () => (
  <div className="space-y-6">
    <HeadingSmall
      title="Appearance settings"
      description="Update your account's appearance settings"
    />
    <AppearanceTabs />
  </div>
);
