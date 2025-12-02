"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { useIsMobile } from "@/hooks/use-mobile";

import {
  AlertCircleIcon,
  EllipsisVerticalIcon,
  ShareIcon,
  StarIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";

export function More({ routeId }: { routeId: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="icon" variant="outline">
            <EllipsisVerticalIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Доступные действия</DrawerTitle>
          </DrawerHeader>
          <ItemGroup className="px-2 gap-1">
            <Item variant="muted" size="sm">
              <ItemMedia variant="icon">
                <StarIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Добавить в избранное</ItemTitle>
              </ItemContent>
            </Item>
            <Item variant="muted" size="sm">
              <ItemMedia variant="icon">
                <ShareIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Поделиться</ItemTitle>
              </ItemContent>
            </Item>
            <Separator />
            <Item variant="muted" size="sm">
              <ItemMedia variant="icon">
                <AlertCircleIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Пожаловаться</ItemTitle>
              </ItemContent>
            </Item>
          </ItemGroup>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <StarIcon />
          Добавить в избранное
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShareIcon />
          Поделиться
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <AlertCircleIcon />
          Пожаловаться
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
