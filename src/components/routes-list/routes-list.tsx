import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { RoutesTable } from "./routes-table";

import { getRoutes } from "@/actions/routes";
import { XIcon } from "lucide-react";

export async function RoutesList() {
  const res = await getRoutes({});
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
