import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";

import { Tables } from "@/types/database";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  EllipsisVerticalIcon,
  InfoIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { More } from "./more";

type Props = {
  routes: (Pick<Tables<"routes">, "name" | "route_id" | "description"> & {
    ratings: Omit<Tables<"routes_ratings">, "route_id" | "rating_id">[];
  } & {
    profile: Pick<Tables<"profiles">, "full_name">;
  })[];
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
            <Button variant="outline">
              <InfoIcon />
              Подробнее
            </Button>

            <More routeId={route.route_id} />
          </ItemFooter>
        </Item>
      ))}
    </ItemGroup>
  );
}
