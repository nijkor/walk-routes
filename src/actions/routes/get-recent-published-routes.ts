"use server";

import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/types/database";

type Response = {
  ok: boolean;
  error: null | string;
  data?:
    | (Tables<"routes"> & {
        history: Pick<
          Tables<"routes_moderation_history">,
          "happened_at" | "status"
        >[];
      })[]
    | null;
};

export async function getRecentPublishedRoutes(): Promise<Response> {
  try {
    const supabase = await createClient();

    // TODO: переделать на rpc
    // получаем последние 50 маршрутов
    const { data, error } = await supabase
      .from("routes")
      .select(
        `
        *,
        history:routes_moderation_history!routes_moderation_history_route_id_fkey(
            happened_at,
            status
        )
    `,
      )
      .order("route_id", { ascending: false })
      .order("happened_at", {
        referencedTable: "routes_moderation_history",
        ascending: false,
      })
      .limit(1, { foreignTable: "routes_moderation_history" })
      .limit(50);
    if (error || !data) {
      console.log(error);
      throw new Error(
        "Не удалось загрузить последние опубликованные маршруты.",
      );
    }

    // фильтруем только маршруты, у которых последний статус — published
    const publishedRoutes = data
      .filter((route) => route.history?.[0]?.status === "published")
      .slice(0, 15);

    return {
      ok: true,
      data: publishedRoutes,
      error: null,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Database error happened.",
      data: null,
    };
  }
}
