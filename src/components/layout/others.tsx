"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  EllipsisVerticalIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

export function Others() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-lg">
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" sideOffset={24}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Тема</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <MonitorIcon />
            Авто
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <SunIcon />
            Светлая
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <MoonIcon />
            Темная
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
