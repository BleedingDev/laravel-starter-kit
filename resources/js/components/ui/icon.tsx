import type { LucideIcon } from "lucide-react";

interface IconProps {
  iconNode?: LucideIcon | null;
  className?: string;
}

export const Icon = ({ iconNode: IconComponent, className }: IconProps) => {
  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
};
