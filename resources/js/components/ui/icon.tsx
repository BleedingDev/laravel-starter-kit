import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

interface IconProps {
  iconNode?: IconSvgElement | null;
  className?: string;
  strokeWidth?: number;
}

export const Icon = ({ iconNode, className, strokeWidth = 2 }: IconProps) => {
  if (!iconNode) {
    return null;
  }

  return (
    <HugeiconsIcon
      icon={iconNode}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
};
