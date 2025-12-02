"use client";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EllipsisVerticalIcon, LogOutIcon, PenIcon } from "lucide-react";

import { Logout } from "./logout";

export function ProfileActions() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);

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
            onClick={() => setLogoutDialogOpen(true)}
            variant="destructive"
          >
            <LogOutIcon />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Logout open={logoutDialogOpen} setOpen={setLogoutDialogOpen} />
    </div>
  );
}
