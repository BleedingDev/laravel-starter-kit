import type { HTMLAttributes } from "react";

import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppearance } from "@/hooks/use-appearance";

const AppearanceToggleDropdown = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { appearance, updateAppearance } = useAppearance();

  const options = [
    { icon: Sun, label: "Light", value: "light" },
    { icon: Moon, label: "Dark", value: "dark" },
    { icon: Monitor, label: "System", value: "system" },
  ] as const;

  const currentIcon = getAppearanceIcon(appearance);

  return (
    <div className={className} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
            {currentIcon}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map((option) => (
            <AppearanceOption
              key={option.value}
              icon={option.icon}
              label={option.label}
              value={option.value}
              onSelect={updateAppearance}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default AppearanceToggleDropdown;

const AppearanceOption = ({
  icon: Icon,
  label,
  value,
  onSelect,
}: {
  icon: LucideIcon;
  label: string;
  value: "light" | "dark" | "system";
  onSelect: (value: "light" | "dark" | "system") => void;
}) => (
  <DropdownMenuItem onClick={() => onSelect(value)}>
    <AppearanceOptionLabel Icon={Icon} label={label} />
  </DropdownMenuItem>
);

const AppearanceOptionLabel = ({
  Icon,
  label,
}: {
  Icon: LucideIcon;
  label: string;
}) => (
  <span className="flex items-center gap-2">
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </span>
);

const getAppearanceIcon = (appearance: "light" | "dark" | "system") => {
  switch (appearance) {
    case "dark": {
      return <Moon className="h-5 w-5" />;
    }
    case "light": {
      return <Sun className="h-5 w-5" />;
    }
    default: {
      return <Monitor className="h-5 w-5" />;
    }
  }
};
