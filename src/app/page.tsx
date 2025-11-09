import { createClient } from "@/lib/supabase/server"

export default async function Home() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()

    return (
        <div className="p-2">
            <pre className="text-xs bg-muted w-min p-2 rounded-sm border">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    )
}