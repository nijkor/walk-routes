import { BottomNavigation } from "./bottom-navigation";

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen relative max-w-xl mx-auto">
      {children}
      <BottomNavigation />
    </main>
  );
}
