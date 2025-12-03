import { Suspense } from "react";

import { Route, Skeleton } from "@/components/route";

export default async function RoutePage({
  params,
}: {
  params: Promise<{ routeId: string }>;
}) {
  const { routeId } = await params;
  return (
    <div className="mx-4 my-6">
      <Suspense fallback={<Skeleton />}>
        <Route routeId={routeId} />
      </Suspense>
    </div>
  );
}
