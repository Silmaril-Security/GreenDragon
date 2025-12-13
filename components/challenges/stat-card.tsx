import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  solved: number;
  total: number;
  colorClass?: string;
  bgColorClass?: string;
};

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
        <span
          className={cn(
            "font-medium text-xs uppercase tracking-wider",
            colorClass
          )}
        >
          {title}
        </span>
        <span className="text-muted-foreground text-xs">{percentage}%</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-bold text-2xl">{solved}</span>
        <span className="text-muted-foreground text-sm">/ {total}</span>
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
