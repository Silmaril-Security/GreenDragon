import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "scrollbar-none flex items-center gap-1 overflow-x-auto text-muted-foreground text-sm",
        className
      )}
    >
      {items.map((item, index) => (
        <div className="flex shrink-0 items-center gap-1" key={item.label}>
          {index > 0 && <ChevronRight className="size-4 shrink-0" />}
          {item.href ? (
            <Link
              className="whitespace-nowrap transition-colors hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          ) : (
            <span className="whitespace-nowrap text-foreground">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
