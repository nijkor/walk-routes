import { Button } from "@/components/ui/button";

import { RoutesList } from "@/components/routes-list";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <div className="mx-4 mt-6 flex flex-row items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Список маршрутов
        </h1>

        <Link href="/profile/new">
          <Button
            size="icon-sm"
            variant="outline"
            className="hover:-translate-y-1 focus:scale-125 duration-500 rounded-full"
          >
            <PlusIcon />
          </Button>
        </Link>
      </div>
      <RoutesList />
    </>
  );
}
