"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { ImageOffIcon } from "lucide-react";

import { useRoute } from "@/contexts/route-context";

export function Photos() {
  const { photos, name } = useRoute();

  if (photos.length === 0)
    return (
      <Empty className="h-full w-full bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ImageOffIcon />
          </EmptyMedia>
          <EmptyTitle>Фотографии маршрута отсутствуют</EmptyTitle>
          <EmptyDescription>Автор не добавил фотографий.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );

  return (
    <Carousel className="rounded-3xl relative w-full h-full">
      <CarouselContent className="h-full">
        {photos.map((photo, index) => (
          <CarouselItem className="h-full w-full" key={index}>
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <img
                alt={`${name}. Фото ${index + 1}`}
                src={photo.path_to}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 top-1/2 z-20 -translate-y-1/2" />
      <CarouselNext className="right-3 top-1/2 z-20 -translate-y-1/2" />
    </Carousel>
  );
}
