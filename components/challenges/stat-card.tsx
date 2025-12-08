import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  solved: number;
  total: number;
  colorClass?: string;
  bgColorClass?: string;
}

export function StatCard({
  title,
  solved,
  total,
  colorClass = "text-primary",
  bgColorClass = "bg-primary",
}: StatCardProps) {
  const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className={cn("text-xs font-medium uppercase tracking-wider", colorClass)}>
          {title}
        </span>
        <span className="text-xs text-muted-foreground">{percentage}%</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold">{solved}</span>
        <span className="text-sm text-muted-foreground">/ {total}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full transition-all", bgColorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
