import { Separator } from "@/components/ui/separator";
import { Skeleton as Sk } from "@/components/ui/skeleton";

export function Skeleton() {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Sk className="w-full h-100 rounded-4xl" />
        <Sk className="absolute top-3.5 right-3.5 w-40 h-7 border-4 border-background rounded-full" />
      </div>
      <div className="mt-2 px-3 bg-linear-to-b from-65% from-background to-background/0">
        <Sk className="w-full h-12" />
        <Sk className="mt-1 w-2/3 h-12" />

        <Sk className="mt-3 w-full h-7" />
        <Sk className="mt-1 w-full h-7" />
        <Sk className="mt-1 w-1/3 h-7" />
      </div>
      <Separator />
    </div>
  );
}
