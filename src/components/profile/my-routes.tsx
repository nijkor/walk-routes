import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemGroup,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemFooter,
  ItemHeader,
} from "@/components/ui/item";

import { AlertCircleIcon, ChevronRightCircleIcon } from "lucide-react";

import { getUserRoutes } from "@/actions/routes/get-user-routes";

import type { Tables } from "@/types/database";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Activity } from "react";

export async function MyRoutes() {
  const res = await getUserRoutes();
  if (!res.ok || !res.data) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircleIcon />
          </EmptyMedia>
          <EmptyTitle>Не удалось загрузить маршруты</EmptyTitle>
          <EmptyMedia>{res.error}</EmptyMedia>
        </EmptyHeader>
      </Empty>
    );
  }

  // статус маршрута
  const LastStatusBadge = ({
    status,
  }: {
    status: Tables<"routes_moderation_history">["status"];
  }) => {
    switch (status) {
      case "uploaded":
        return (
          <Badge className="bg-muted text-muted-foreground">Загружен</Badge>
        );
      case "published":
        return (
          <Badge className="bg-green-300 dark:bg-green-950 text-green-600">
            Опубликован
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive">Отклонен</Badge>
        );
      case "deleted":
        return (
          <Badge className="bg-destructive/10 text-destructive">Удален</Badge>
        );
    }
  };

  return (
    <ItemGroup className="gap-1">
      {res.data.map((route) => (
        <Item variant="muted" key={route.route_id}>
          <ItemHeader>
            <LastStatusBadge
              status={route.history?.[0]?.status ?? "uploaded"}
            />
          </ItemHeader>
          <ItemContent>
            <ItemTitle>{route.name}</ItemTitle>
            <ItemDescription>{route.description}</ItemDescription>
          </ItemContent>
          <Activity
            mode={route.history[0].status === "deleted" ? "hidden" : "visible"}
          >
            <ItemFooter>
              <Button asChild>
                <Link href={`/routes/${route.route_id}`}>
                  Открыть
                  <ChevronRightCircleIcon />
                </Link>
              </Button>
            </ItemFooter>
          </Activity>
        </Item>
      ))}
    </ItemGroup>
  );
}

export function MyRoutesSkeleton() {
  return (
    <ItemGroup className="gap-2">
      {Array.from({ length: 5 }).map((_, k) => (
        <Skeleton className="w-full h-30" key={k} />
      ))}
    </ItemGroup>
  );
}
