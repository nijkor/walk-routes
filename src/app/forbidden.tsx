'use client'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from "@/components/ui/empty"

import { BanIcon, ChevronLeftIcon } from "lucide-react"

export default function ForbiddenPage() {
    const router = useRouter();

    return (
        <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30% rounded-none">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <BanIcon />
                </EmptyMedia>
                <EmptyTitle>Доступ запрещен</EmptyTitle>
                <EmptyDescription>
                    К сожалению, у вас нет прав для просмотра этой страницы.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    <ChevronLeftIcon />
                    назад
                </Button>
            </EmptyContent>

            <p className="text-muted-foreground text-sm">403 Forbidden</p>
        </Empty>
    )
}