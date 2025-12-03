"use client";
import {
  Activity,
  type FormEventHandler,
  useEffect,
  useEffectEvent,
  useState,
  useTransition,
} from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

import {
  ChevronRightCircleIcon,
  CircleSlash2Icon,
  SearchIcon,
} from "lucide-react";

import { More } from "../more";

import { useDebounce } from "@/hooks/use-debounce";

import { searchRoutes } from "@/actions/routes";
import type { Tables } from "@/types/database";

type Routes = (Pick<Tables<"routes">, "name" | "route_id" | "description"> & {
  ratings: Omit<Tables<"routes_ratings">, "route_id" | "rating_id">[];
} & {
  profile: Pick<Tables<"profiles">, "full_name">;
})[];

export function Search() {
  const [query, setQuery] = useState<string>("");
  const debouncedValue = useDebounce(query, 500);
  const [routes, setRoutes] = useState<Routes | null>();

  const [isPending, startTransition] = useTransition();

  // изменение значения запроса
  const handleQueryChange: FormEventHandler<HTMLInputElement> = (e) =>
    setQuery(e.currentTarget.value);

  // получение списка маршрутов при изменении запроса (эффект)
  const getRoutesEvent = useEffectEvent((query: string) => {
    // обнуляем список, если не задан запрос
    if (query.length == 0) {
      setRoutes(null);
      return;
    }

    startTransition(async () => {
      const res = await searchRoutes(query);
      if (!res.ok || !res.data) {
        alert(res.error || "Произошла неизвестная ошибка");
        return;
      }
      setRoutes(res.data);
    });
  });

  useEffect(() => {
    getRoutesEvent(debouncedValue);
  }, [debouncedValue]);

  const renderItem = (route: Routes[number]) => (
    <Item variant="muted" key={route.route_id}>
      <ItemContent>
        <ItemTitle>{route.name}</ItemTitle>
        <ItemDescription>{route.description}</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <Button
          variant="outline"
          className="px-5 rounded-full"
          size="sm"
          asChild
        >
          <Link href={`/route/${route.route_id}`}>
            Подробнее
            <ChevronRightCircleIcon />
          </Link>
        </Button>

        <More routeId={route.route_id} />
      </ItemFooter>
    </Item>
  );

  return (
    <div className="space-y-6">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          value={query}
          onChange={handleQueryChange}
          placeholder="Начните вводить запрос..."
        />
        <Activity mode={isPending ? "visible" : "hidden"}>
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        </Activity>
      </InputGroup>

      {routes?.length == 0 && !routes === null ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleSlash2Icon />
            </EmptyMedia>
            <EmptyTitle>Ничего не найдено</EmptyTitle>
            <EmptyDescription>
              По вашему запросу маршрутов не найдено.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ItemGroup className="gap-2">
          {routes?.map((r) => renderItem(r))}
        </ItemGroup>
      )}
    </div>
  );
}
