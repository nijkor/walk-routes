import { Tables } from "@/types/database";
import { User2Icon } from "lucide-react";

type Props = {
  profile: Tables<"profiles">;
};

export function Header({ profile }: Props) {
  return (
    <section>
      <div className="relative min-h-40 bg-muted">
        <div className="absolute bottom-0 translate-y-1/2">
          <div className="mx-3 flex flex-row items-center gap-2">
            <div className="size-20 bg-black text-white rounded-full border-8 border-background flex items-center justify-center">
              {profile.full_name ? (
                <span className="text-2xl font-bold">
                  {profile.full_name?.[0]}
                </span>
              ) : (
                <User2Icon />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-6 mx-6">
        <h1 className="text-2xl font-semibold">{profile.full_name}</h1>
        <span className="text-muted-foreground">@username</span>
      </div>
    </section>
  );
}
