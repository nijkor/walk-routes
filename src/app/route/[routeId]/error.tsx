"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AlertCircleIcon, IterationCcwIcon } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Empty className="mt-2 mx-4 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon />
        </EmptyMedia>
        <EmptyTitle>На странице произошла ошибка</EmptyTitle>
        <EmptyDescription>Попробуйте вернуться позднее.</EmptyDescription>
      </EmptyHeader>
      <Button onClick={reset} variant="default">
        <IterationCcwIcon />
        Обновить
      </Button>
    </Empty>
  );
}
