import { Suspense } from "react";
import { Profile } from "@/components/profile";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мой профиль",
};

export default function ProfilePage() {
  return (
    <Suspense>
      <Profile />
    </Suspense>
  );
}
