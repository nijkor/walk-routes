"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SearchIcon } from "lucide-react";
import { Search } from "./search";

export function SearchDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon-sm"
          variant="outline"
          className="hover:-translate-y-1 focus:scale-125 duration-500 rounded-full"
        >
          <SearchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Поиск по маршрутам</DialogTitle>
          <DialogDescription>
            Найдите нужный маршрут по части названия или описания.
          </DialogDescription>
        </DialogHeader>

        <Search />
      </DialogContent>
    </Dialog>
  );
}
