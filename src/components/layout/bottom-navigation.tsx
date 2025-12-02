import {
  EllipsisVerticalIcon,
  MapIcon,
  Settings2Icon,
  User2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function BottomNavigation() {
  return (
    <div className="z-20 fixed bottom-0 left-0 right-0">
      <div className="max-w-xl mx-auto bg-background border-t py-4 px-6 flex flex-row justify-between items-center">
        <Link href="/">
          <Button variant="ghost" size="icon-lg">
            <MapIcon />
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="ghost" size="icon-lg">
            <User2Icon />
          </Button>
        </Link>
        <Button variant="ghost" size="icon-lg">
          <Settings2Icon />
        </Button>
        <Button variant="ghost" size="icon-lg">
          <EllipsisVerticalIcon />
        </Button>
      </div>
    </div>
  );
}
