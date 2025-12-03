"use client";

export function Rating({ rating }: { rating: number }) {
  if (rating > 0)
    return (
      <div className="flex flex-row justify-between items-center">
        <span className="text-xs text-muted-foreground">
          средняя оценка: {rating}
        </span>
      </div>
    );
}
