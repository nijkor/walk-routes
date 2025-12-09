"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useProfile } from "@/contexts/profile-context";

export function CreateRouteButton() {
    const profile = useProfile();
    if (!profile) return null

    return (
        <Button
            size="icon-sm"
            variant="outline"
            className="not-disabled:hover:-translate-y-1 not-disabled:focus:scale-125 not-disabled:duration-500 rounded-full disabled:opacity-70 disabled:pointer-events-none"
            asChild
        >

            <Link href="/profile/new">
                <PlusIcon />
            </Link>
        </Button>
    );
}