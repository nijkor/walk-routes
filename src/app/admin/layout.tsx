import { getProfile } from "@/actions/profile";
import { forbidden } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // проверка ролей
    const res = await getProfile();
    if (!res.ok || !res.data) forbidden()
    if (!res.data.roles?.includes("admin")) forbidden()

    return <>{children}</>;
}