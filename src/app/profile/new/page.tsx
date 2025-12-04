import { Separator } from "@/components/ui/separator";

import { NewRouteForm } from "@/components/new-route";

export const metadata = {
  title: "Создание маршрута",
};

export default function NewRoutePage() {
  return (
    <div className="mx-4 mt-6 pb-25 flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Новый маршрут
      </h1>

      <Separator />

      <NewRouteForm />
    </div>
  );
}
