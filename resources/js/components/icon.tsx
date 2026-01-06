import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

interface IconProps extends Omit<LucideProps, "ref"> {
  iconNode: ComponentType<LucideProps>;
}

export const Icon = ({
  iconNode: IconComponent,
  className,
  ...props
}: IconProps) => (
  <IconComponent className={cn("h-4 w-4", className)} {...props} />
);
