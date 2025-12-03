"use server";
import z from "zod";
import { createClient } from "@/lib/supabase/server";

/**
 * Поиск по маршрутам в базе для поиска на главной
 * @param filters Фильтры
 */
export async function searchRoutes(q: string) {
  try {
    // валидация фильтров
    const validatedQuery = z
      .string()
      .min(3, "Длина запроса не может быть короче 3 символов.")
      .safeParse(q);
    if (!validatedQuery.success)
      throw new Error(validatedQuery.error.issues[0].message);

    const supabase = await createClient();

    // составляем запрос
    const { data, error } = await supabase
      .from("routes")
      .select(
        `
        route_id,
        name,
        description,
        profile:profiles!routes_user_id_fkey(full_name, profile_id),
        ratings:routes_ratings!routes_rating_route_id_fkey(
            user_id,
            created_at,
            rating
        )
    `,
      )
      .ilike("name", `%${validatedQuery.data}%`)
      .order("route_id", { ascending: false });
    if (error)
      throw new Error(
        "Не удалось получить информацию о маршруте из-за ошибки базы данных.",
      );

    return {
      ok: true,
      data,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Произошла неизвестная ошибка",
    };
  }
}
