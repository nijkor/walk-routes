"use server";
import { createClient } from "@/lib/supabase/server";
import z from "zod";
import { getProfile } from "@/actions/profile";

type Response = {
  ok: boolean;
  error: string | null;
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
  photos: z.array(z.file()),
});

// удаляет из имени файла неподходящие символы и обрезает до 120 символов
function sanitizeFilename(name: string) {
  return name.replace(/[^\w.\-]+/g, "_").slice(0, 120);
}

export async function createRoute(form: unknown): Promise<Response> {
  try {
    // валидация формы
    const validated = FormSchema.safeParse(form);
    if (!validated.success) throw new Error(validated.error.issues[0].message);

    const supabase = await createClient();

    // получаем айди профиля пользователя
    const { ok, data: profile } = await getProfile();
    if (!ok || !profile)
      throw new Error("Не удалось получить информацию о пользователе.");

    const profileId = profile.profile_id;
    const { photos, ...routeData } = validated.data;

    // добавляем маршрут в базу
    const { data: route, error: routeError } = await supabase
      .from("routes")
      .insert({
        user_id: profileId,
        ...routeData,
      })
      .select()
      .single();
    if (routeError || !route)
      throw new Error("Не удалось сохранить маршрут из-за ошибки базы данных.");

    // загружаем фото в хранилище и сохраняем пути в базу
    if (photos.length > 0) {
      const publicUrls: string[] = [];

      for (const file of photos) {
        const safeName = sanitizeFilename(file.name || "photo");
        const path = `routes/${route.route_id}/${crypto.randomUUID()}_${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(path, file, {
            contentType: file.type || "application/octet-stream",
            upsert: false,
          });

        if (uploadError) {
          throw new Error("Не удалось загрузить фотографии в хранилище.");
        }

        const { data } = supabase.storage.from("photos").getPublicUrl(path);
        if (!data?.publicUrl) {
          throw new Error(
            "Не удалось получить публичную ссылку на фотографию.",
          );
        }

        publicUrls.push(data.publicUrl);
      }

      const { error: photosInsertError } = await supabase
        .from("routes_photos")
        .insert(
          publicUrls.map((url) => ({
            route_id: route.route_id,
            path_to: url,
          })),
        );

      if (photosInsertError) {
        throw new Error("Не удалось сохранить информацию о фотографиях.");
      }
    }

    return {
      ok: true,
      error: null,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "",
    };
  }
}
