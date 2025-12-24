import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
      className={cn(
        "flex items-center gap-1 text-sm text-muted-foreground overflow-x-auto scrollbar-none",
        className
      )}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-1 shrink-0">
          {index > 0 && <ChevronRight className="size-4 shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="whitespace-nowrap hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="whitespace-nowrap text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
