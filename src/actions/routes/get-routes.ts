"use server";
import z from "zod";
import { createClient } from "@/lib/supabase/server";
import { RouteInfo } from "@/types/route-info";

const filtersSchema = z.object({
  id: z.uuid("Введен некорректный формат идентификатора маршрута").optional(),
  name: z.string().trim().normalize().lowercase().optional(),
  single: z.boolean().default(false).optional(),
});

type Filters = z.infer<typeof filtersSchema>;

type Response = {
  ok: boolean;
  data: RouteInfo[] | null;
  error: string | null;
}

/**
 * Поиск по маршрутам в базе
 * @param filters Фильтры
 */
export async function getRoutes(filters: Filters): Promise<Response> {
  try {
    // валидация фильтров
    const validatedFilters = filtersSchema.safeParse(filters);
    if (!validatedFilters.success)
      throw new Error(validatedFilters.error.issues[0].message);

    const supabase = await createClient();

    // составляем запрос
    let query = supabase.from("routes").select(`
        *,
        profile:profiles!routes_user_id_fkey(full_name, profile_id),
        ratings:routes_ratings!routes_rating_route_id_fkey(
          route_id,
          rating,
          created_at
        )
    `);

    // фильтры
    if (validatedFilters.data.id)
      // по айди
      query = query.eq("route_id", validatedFilters.data.id);
    if (validatedFilters.data.name)
      // по имени
      query = query.eq("name", validatedFilters.data.name);
    if (validatedFilters.data.single)
      // показать только один
      query = query.limit(1);

    const { data, error } = await query.overrideTypes<RouteInfo[]>();
    if (error) 
      throw new Error(
        "Не удалось получить информацию о маршруте из-за ошибки базы данных.",
      );

    return {
      ok: true,
      data,
      error: null
    };
  } catch (e) {
    return {
      ok: false,
      data: null,
      error: e instanceof Error ? e.message : "Произошла неизвестная ошибка",
    };
  }
}
