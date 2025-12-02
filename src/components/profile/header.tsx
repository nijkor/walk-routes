import { ProfileActions } from "./profile-actionts";

import { User2Icon } from "lucide-react";

import { Tables } from "@/types/database";

type Props = {
  profile: Tables<"profiles">;
};

export function Header({ profile }: Props) {
  return (
    <section>
      <div className="relative min-h-40 bg-muted rounded-b-lg">
        <div className="absolute bottom-0 translate-y-1/2 w-full">
          <div className="mx-3 flex flex-row items-center justify-between gap-2">
            {/* Аватарка */}
            <div className="size-20 bg-black text-white rounded-full border-8 border-background flex items-center justify-center">
              {profile.full_name ? (
                <span className="text-2xl font-bold">
                  {profile.full_name?.[0]}
                </span>
              ) : (
                <User2Icon />
              )}
            </div>

            <ProfileActions />
          </div>
        </div>
      </div>

      <div className="mt-12 mb-6 mx-6 space-y-3">
        <div className="-space-y-2">
          <h1 className="text-2xl font-semibold">{profile.full_name}</h1>
          <span className="text-muted-foreground text-xs">@username</span>
        </div>
        {profile.bio ? <p className="font-medium">{profile.bio}</p> : null}
      </div>
    </section>
  );
}
