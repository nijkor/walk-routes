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
import Image from "next/image";

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
    <Carousel className="bg-muted/30 w-full h-full rounded-3xl">
      <CarouselContent className="h-full">
        {photos.map((photo, key, photos) => (
          <CarouselItem key={key} className="h-full w-full relative">
            <Image
              src={photo.path_to}
              alt={`${name} — фото ${key + 1} из ${photos.length}`}
              fill
              className="w-full h-full object-center object-contain"
            />
            <Image
              src={photo.path_to}
              alt={`${name} — фото ${key + 1} из ${photos.length}`}
              fill
              className="-z-5 w-full h-full object-center object-cover blur-3xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 top-1/2 z-20 -translate-y-1/2" />
      <CarouselNext className="right-3 top-1/2 z-20 -translate-y-1/2" />
    </Carousel>
  );
}
