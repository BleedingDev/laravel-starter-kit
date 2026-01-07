import {
  HugeiconsIcon,
  type HugeiconsIconProps,
  type IconSvgElement,
} from "@hugeicons/react";

import { cn } from "@/lib/utils";

interface IconProps extends Omit<HugeiconsIconProps, "icon"> {
  iconNode: IconSvgElement;
}

export const Icon = ({
  iconNode,
  className,
  strokeWidth = 2,
  ...props
}: IconProps) => (
  <HugeiconsIcon
    icon={iconNode}
    strokeWidth={strokeWidth}
    className={cn("h-4 w-4", className)}
    {...props}
  />
);
