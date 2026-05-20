import { AlertTriangle, BarChart3, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "warning" | "tip" | "info" | "statistic";

const variantStyles: Record<
  CalloutVariant,
  { borderColor: string; bgColor: string; Icon: typeof AlertTriangle }
> = {
  warning: {
    borderColor: "border-amber-500",
    bgColor: "bg-amber-500/10",
    Icon: AlertTriangle,
  },
  tip: {
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-500/10",
    Icon: Lightbulb,
  },
  info: {
    borderColor: "border-blue-500",
    bgColor: "bg-blue-500/10",
    Icon: Info,
  },
  statistic: {
    borderColor: "border-purple-500",
    bgColor: "bg-purple-500/10",
    Icon: BarChart3,
  },
};

type CalloutProps = {
  variant: CalloutVariant;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Callout({ variant, title, children, className }: CalloutProps) {
  const style = variantStyles[variant];
  const { Icon } = style;

  return (
    <div
      className={cn(
        "rounded-lg border-l-4 p-4",
        style.borderColor,
        style.bgColor,
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2 font-medium">
        <Icon className="size-4" />
        <span>{title}</span>
      </div>
      <div className="text-muted-foreground text-sm">{children}</div>
    </div>
  );
}
