"use client";
import { Activity } from "react";
import Link from "next/link";

import { useRoute } from "@/contexts/route-context";

export function Info() {
  const { name, description, ratings, profile } = useRoute();

  // средняя оценка
  const averageRating = ratings.length
    ? ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length
    : 0;

  return (
    <div className="absolute bottom-0 w-full bg-linear-to-t from-background from-50% to-background/0">
      <div className="px-2 flex flex-col gap-3">
        {/* основное инфо о маршруте */}
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 shadom-xl">
          {name}
        </h2>
        <p className="leading-7 not-first:mt-1">{description}</p>

        {/* ссылка на пользователя */}
        <button className="bg-muted/30 hover:bg-muted border-4 border-muted p-1 rounded-full transition-all">
          <Link href={`/user/${profile.profile_id}`}>
            <div className="w-full flex flex-row items-center gap-x-3">
              <div className="size-8 rounded-full bg-foreground" />

              <span className="font-medium">{profile.full_name}</span>
            </div>
          </Link>
        </button>

        {/* средняя оценка пользователей */}
        <Activity mode={averageRating > 0 ? "visible" : "hidden"}>
          <p className="text-muted-foreground text-sm">
            Средняя оценка: {averageRating.toFixed(2)}
          </p>
        </Activity>
      </div>
    </div>
  );
}
