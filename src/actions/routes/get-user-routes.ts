"use server";

import { createClient } from "@/lib/supabase/server";
import { getClaims } from "@/actions/auth";

export async function getUserRoutes() {
  try {
    const supabase = await createClient();

    // получаем айди профиля пользователя
    const claims = await getClaims();
    if (!claims.ok) throw new Error("Database error happened.");

    const uid = claims.claims.sub as string;

    // получаем профиль
    const { data: profile } = await supabase
      .from("profiles")
      .select("profile_id")
      .eq("user_id", uid)
      .single();
    if (!profile) throw new Error("Не удалось получить информацию о профиле.");

    // получаем маршруты со статусом
    const { data: routes, error } = await supabase
      .from("routes")
      .select(
        `
          route_id,
          name,
          description,
          history:routes_moderation_history!routes_moderation_history_route_id_fkey(
            happened_at,
            status
          )
        `,
      )
      .eq("user_id", profile.profile_id)
      .order("route_id", { ascending: false })
      .order("happened_at", {
        referencedTable: "routes_moderation_history",
        ascending: false,
      })
      .limit(1, { foreignTable: "routes_moderation_history" });
    if (!routes) throw new Error("Не удалось получить список маршрутов.");

    // получаем его маршруты
    return {
      ok: true,
      error: null,
      data: routes,
    };
  } catch (e) {
    return {
      ok: false,
      data: null,
      error: e instanceof Error ? e.message : "",
    };
  }
}
