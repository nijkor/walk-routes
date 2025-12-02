"use client";
import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { logout } from "@/actions/auth";

type Props = {
  open: boolean;
  setOpen: (...args: any[]) => unknown;
};

export function Logout({ open, setOpen }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Вы точно хотите выйти из аккаунта?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Доступ к маршрутам от вашего имени пропадет с этого устройства до
              повторного входа.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Нет, не хочу</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={isPending}
            >
              {isPending && <Spinner />}
              Да, выйти
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
