"use server";
import { createClient } from "@/lib/supabase/server";
import z from "zod";
import { getClaims } from "../auth";

type Response =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: string;
    };

const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Название маршрута не может быть короче 5 символов.")
    .max(140, "Название маршрута не может быть длиннее 140 символов."),
  description: z
    .string()
    .trim()
    .min(
      20,
      "Слишком мало информации — другие пользователи не поймут, в чем изюминка вашего маршрута.",
    ),
  type: z.enum(["bicycle", "pedestrian"]),
  points: z.json(),
  city: z.string().min(2, "Название города не может быть короче 2 символов."),
});

export async function createRoute(form: unknown): Promise<Response> {
  try {
    // валидация формы
    const validated = FormSchema.safeParse(form);
    if (!validated.success) throw new Error(validated.error.issues[0].message);

    const supabase = await createClient();

    // получаем айди пользователя
    const claims = await getClaims();
    if (!claims.ok || !claims.claims.sub)
      throw new Error("Произошла ошибка базы данных.");

    const uid = claims.claims.sub as string;

    // получаем айди профиля
    const { data: profile } = await supabase
      .from("profiles")
      .select("profile_id")
      .eq("user_id", uid)
      .maybeSingle();
    if (!profile?.profile_id) throw new Error("");

    // добавляем маршрут в базу
    const { data: route, error } = await supabase
      .from("routes")
      .insert({
        user_id: profile.profile_id,
        ...validated.data,
      })
      .select()
      .single();
    if (error)
      throw new Error("Не удалось сохранить маршрут из-за ошибки базы данных.");

    // автоматическая модерация маршрута. из-за нехватки времени не смог админку доделать, временно так
    // TODO: удалить это
    await supabase.from("routes_moderation_history").insert({
      moderator_id: profile.profile_id,
      route_id: route.route_id,
      status: "published",
    });

    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "",
    };
  }
}
