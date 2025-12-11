import { Suspense } from "react";

// UI
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Части профиля
import { Header } from "./header";
import { MyRoutes, MyRoutesSkeleton } from "./my-routes";

// SA
import { getProfile } from "@/actions/profile";

export async function Profile() {
  const res = await getProfile();

  if (!res.ok) {
    return <p>Произошла ошибка: {res.error}</p>;
  }

  return (
    <>
      <Header profile={res.data} />

      <Tabs className="px-2" defaultValue="my_routes">
        <TabsList>
          <TabsTrigger value="my_routes">Мои маршруты</TabsTrigger>
        </TabsList>
        <TabsContent value="my_routes">
          <Suspense fallback={<MyRoutesSkeleton />}>
            <MyRoutes />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
}
