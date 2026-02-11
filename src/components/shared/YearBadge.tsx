interface YearBadgeProps {
  year: number;
  className?: string;
}

export function YearBadge({ year, className = "" }: YearBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border-2 border-foreground bg-muted px-2.5 py-0.5 text-xs font-bold text-foreground ${className}`}
    >
      {year}
    </span>
  );
}
