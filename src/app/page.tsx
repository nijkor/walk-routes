import { RoutesList, SearchDialog } from "@/components/routes-list";
import { CreateRouteButton } from "@/components/new-route";

export default function HomePage() {
  return (
    <>
      <div className="mx-4 mt-6 flex flex-row items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Список маршрутов
        </h1>

        <div className="flex flex-row items-center gap-2">
          <SearchDialog />
          <CreateRouteButton />
        </div>
      </div>
      <RoutesList />
    </>
  );
}
