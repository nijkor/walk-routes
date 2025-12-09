import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { XIcon } from "lucide-react";

import { RoutesTable } from "./routes-table";

import { getRecentPublishedRoutes } from "@/actions/routes/get-recent-published-routes";

export async function RoutesList() {
  const res = await getRecentPublishedRoutes();
  if (!res.ok || !res.data)
    return (
      <Empty className="border bg-muted">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <XIcon />
          </EmptyMedia>
          <EmptyTitle>Произошла ошибка</EmptyTitle>
          <EmptyDescription>{res.error}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );

  return <RoutesTable routes={res.data} />;
}
