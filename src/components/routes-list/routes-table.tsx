import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";

import { Tables } from "@/types/database";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  ChevronRightCircleIcon,
} from "lucide-react";
import { More } from "./more";

type Props = {
  routes: (Tables<"routes"> & {
    history: Pick<
      Tables<"routes_moderation_history">,
      "happened_at" | "status"
    >[];
  })[]
};

export function RoutesTable({ routes }: Props) {
  return (
    <ItemGroup className="px-2 py-4 gap-1">
      {routes.map((route) => (
        <Item variant="muted" key={route.route_id}>
          <ItemContent>
            <ItemTitle>{route.name}</ItemTitle>
            <ItemDescription>{route.description}</ItemDescription>
          </ItemContent>
          <ItemFooter>
            <Button variant="outline" className="rounded-full px-3" asChild>
              <Link href={`/route/${route.route_id}`}>
                Подробнее
                <ChevronRightCircleIcon />
              </Link>
            </Button>

            <More routeId={route.route_id} />
          </ItemFooter>
        </Item>
      ))}
    </ItemGroup>
  );
}
