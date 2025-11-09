"use server";
import z from "zod";
import { createClient } from "@/lib/supabase/server";

const formSchema = z
  .object({
    email: z.email({ error: "Неверный формат почты." }),
    password: z
      .string()
      .min(7, { error: "Пароль не должен быть короче 8 символов." }),
    "confirm-password": z
      .string()
      .min(7, { error: "Пароль не должен быть короче 8 символов." }),
  })
  .refine((ctx) => ctx.password === ctx["confirm-password"], {
    error: "Необходимо ввести один и тот же пароль два раза.",
  });

type Response = {
  fields: z.infer<typeof formSchema>;
} & (
  | {
      ok: true;
    }
  | {
      ok: false;
      error: string;
    }
);

export async function register(
  _: unknown,
  formData: FormData
): Promise<Response> {
  const data = Object.fromEntries(formData.entries());

  try {
    // валидация формы
    const parsedData = formSchema.safeParse(data);
    if (!parsedData.success)
      throw new Error(parsedData.error.issues[0].message);

    const supabase = await createClient();

    // регистрируемся
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email as string,
      password: data.password as string,
    });
    if (signUpError) throw new Error(signUpError.message);

    return {
      ok: true,
      fields: parsedData.data,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Неизвестная ошибка",
      fields: data as Response["fields"],
    };
  }
}
