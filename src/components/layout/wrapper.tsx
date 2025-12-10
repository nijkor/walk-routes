import { AlertCircleIcon } from "lucide-react";
import { BottomNavigation } from "./bottom-navigation";

import { getProfile } from "@/actions/auth/";
import { ProfileProvider } from "@/contexts/profile-context";

export async function Wrapper({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  if (!profile.ok)
    return (
      <div className="flex flex-row gap-2 text-destructive">
        <AlertCircleIcon />
        <span>Произошла ошибка базы данных.</span>
      </div>
    );

  return (
    <ProfileProvider value={profile.data}>
      <main className="min-h-screen relative max-w-xl mx-auto pb-16">
        {children}
        <BottomNavigation />
      </main>
    </ProfileProvider>
  );
}
