import { cn } from "@/lib/utils";

type ProgressRingProps = {
  progress: number; // 0-100
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
};

const sizeConfig = {
  sm: { diameter: 64, defaultStroke: 4 },
  md: { diameter: 96, defaultStroke: 5 },
  lg: { diameter: 140, defaultStroke: 6 },
};

export function ProgressRing({
  progress,
  size = "md",
  strokeWidth,
  className,
  children,
}: ProgressRingProps) {
  const config = sizeConfig[size];
  const stroke = strokeWidth ?? config.defaultStroke;
  const radius = (config.diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn("relative", className)}
      style={{ width: config.diameter, height: config.diameter }}
    >
      <svg
        className="-rotate-90"
        height={config.diameter}
        width={config.diameter}
      >
        <defs>
          <linearGradient
            id={`emerald-gradient-${size}`}
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          className="text-muted-foreground/20"
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          fill="none"
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          className="transition-[stroke-dashoffset] duration-500 ease-out"
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          fill="none"
          r={radius}
          stroke={`url(#emerald-gradient-${size})`}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={stroke}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
