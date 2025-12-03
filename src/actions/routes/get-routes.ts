"use server";
import z from "zod";
import { createClient } from "@/lib/supabase/server";

const filtersSchema = z.object({
  id: z.uuid("Введен некорректный формат идентификатора маршрута").optional(),
  name: z.string().trim().normalize().lowercase().optional(),
  single: z.boolean().default(false).optional(),
});

type Filters = z.infer<typeof filtersSchema>;

/**
 * Поиск по маршрутам в базе
 * @param filters Фильтры
 */
export async function getRoutes(filters: Filters) {
  try {
    // валидация фильтров
    const validatedFilters = filtersSchema.safeParse(filters);
    if (!validatedFilters.success)
      throw new Error(validatedFilters.error.issues[0].message);

    const supabase = await createClient();

    // составляем запрос
    let query = supabase.from("routes").select(`
        route_id,
        name,
        description,
        profile:profiles!routes_user_id_fkey(full_name),
        ratings:routes_ratings!routes_rating_route_id_fkey(
            user_id,
            created_at,
            rating
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

    const { data, error } = await query;
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
