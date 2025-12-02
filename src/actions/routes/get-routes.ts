"use server";
import z from "zod";
import { createClient } from "@/lib/supabase/server";

const filtersSchema = z.object({
  name: z.string().trim().normalize().lowercase().optional(),
});

type Filters = z.infer<typeof filtersSchema>;

export async function getRoutes(filters: Filters) {
  try {
    // валидация фильтров
    const validatedFilters = filtersSchema.safeParse(filters);
    if (!validatedFilters.success) throw new Error();

    const supabase = await createClient();

    // составляем запрос
    const query = supabase.from("routes").select(`
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

    // поиск по имени
    if (validatedFilters.data?.name) {
      query.eq("name", validatedFilters.data.name);
    }

    const { data, error } = await query;
    if (error) throw new Error("Database error happened.");

    return {
      ok: true,
      data,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "",
    };
  }
}
