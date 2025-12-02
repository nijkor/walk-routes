import { RoutesList } from "@/components/routes-list";

export default function HomePage() {
  return (
    <>
      <h1 className="mt-6 mx-2 scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Список маршрутов
      </h1>
      <RoutesList />
    </>
  );
}
