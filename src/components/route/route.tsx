// UI
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";

import { MessageCircleIcon, XIcon } from "lucide-react";

import { RouteProvider } from "@/contexts/route-context";

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
    <RouteProvider value={route}>
      <section className="space-y-3">
        <Header />
        <Separator />
        <Empty className="bg-muted/30 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageCircleIcon />
            </EmptyMedia>
            <EmptyTitle>Скоро здесь будут доступны рейтинги</EmptyTitle>
            <EmptyDescription>Следите за новостями</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>
    </RouteProvider>
  );
}
