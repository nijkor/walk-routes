"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVerticalIcon, LogOutIcon, PenIcon } from "lucide-react";

export function ProfileActions() {
  return (
    <div className="bg-background border-8 border-background rounded-full space-x-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="p-3 bg-accent rounded-full text-sm font-medium">
            <EllipsisVerticalIcon size={15} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => {}} className="pr-10">
            <PenIcon />
            Редактировать
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {}}
            variant="destructive"
            className="pr-10"
          >
            <LogOutIcon />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
