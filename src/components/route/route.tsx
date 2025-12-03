// UI
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { FullscreenIcon, XIcon } from "lucide-react";

// части страницы
import { Header } from "./header";

import { getRoutes } from "@/actions/routes";

export async function Route({ routeId }: { routeId: string }) {
  const res = await getRoutes({ single: true, id: routeId });
  if (!res.ok)
    return (
      <Empty className="bg-muted/30 border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <XIcon />
          </EmptyMedia>
          <EmptyTitle>Упс...</EmptyTitle>
          <EmptyDescription>{res.error}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );

  const route = res.data![0];

  return (
    <section className="space-y-3">
      <div className="relative w-full h-100 @md:h-70 bg-muted rounded-4xl">
        <Button
          className="absolute top-3.5 right-3.5 rounded-full px-4"
          size="sm"
        >
          <FullscreenIcon />
          развернуть карту
        </Button>

        <Header
          info={{
            name: route.name,
            description: route.description,
            ratings: route.ratings,
            profile: route.profile,
          }}
        />
      </div>
      <Separator />
    </section>
  );
}
