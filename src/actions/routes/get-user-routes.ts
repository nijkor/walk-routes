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
    const { data } = await supabase
      .from("profiles")
      .select(
        `
        routes:routes!routes_user_id_fkey(
            *,
            history:routes_moderation_history!routes_moderation_history_route_id_fkey(*)
        )
        `,
      )
      .eq("user_id", uid)
      .single();
    if (!data) throw new Error("Не удалось получить список маршрутов.");

    // получаем его маршруты
    return {
      ok: true,
      error: null,
      data: data.routes,
    };
  } catch (e) {
    return {
      ok: false,
      data: null,
      error: e instanceof Error ? e.message : "",
    };
  }
}
