import { Button } from "@/components/ui/button";

import { Rating } from "./rating";

import type { Tables } from "@/types/database";
import Link from "next/link";

type Props = {
  info: Pick<Tables<"routes">, "name" | "description"> & {
    ratings: Pick<
      Tables<"routes_ratings">,
      "user_id" | "rating" | "created_at"
    >[];
    profile: Pick<Tables<"profiles">, "profile_id" | "full_name">;
  };
};

export function Header({ info }: Props) {
  // средняя оценка
  const averageRating = info.ratings.length
    ? info.ratings.reduce((sum, item) => sum + item.rating, 0) /
      info.ratings.length
    : 0;

  return (
    <div className="absolute bottom-0 w-full bg-linear-to-t from-background from-20% to-background/0">
      <div className="px-2 flex flex-col gap-3">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {info.name}
        </h2>
        <p className="leading-7 not-first:mt-1">{info.description}</p>

        <button className="bg-muted/30 hover:bg-muted border-4 border-muted p-1 rounded-full transition-all">
          <Link href={`/user/${info.profile.profile_id}`}>
            <div className="w-full flex flex-row items-center gap-x-3">
              <div className="size-8 rounded-full bg-foreground" />

              <span className="font-medium">{info.profile.full_name}</span>
            </div>
          </Link>
        </button>

        <Rating rating={averageRating} />
      </div>
    </div>
  );
}
