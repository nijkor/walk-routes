"use server";
import { redirect } from "next/navigation";
import z from "zod";
import { createClient } from "@/lib/supabase/server";

const formSchema = z.object({
  email: z.email({ error: "Неверный формат почты." }),
  password: z
    .string()
    .min(8, { error: "Пароль не должен быть короче 8 символов." }),
});

type Response =
  | {
      fields: z.infer<typeof formSchema>;
      ok: false;
      error: string;
    }
  | never;

export async function login(_: unknown, formData: FormData): Promise<Response> {
  const data = Object.fromEntries(formData.entries());

  try {
    // валидация формы
    const parsedData = formSchema.safeParse(data);
    if (!parsedData.success)
      throw new Error(parsedData.error.issues[0].message);

    const supabase = await createClient();

    // регистрируемся
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email as string,
      password: data.password as string,
    });
    if (signInError) throw new Error(signInError.message);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    return {
      ok: false,
      error: e instanceof Error ? e.message : "Неизвестная ошибка",
      fields: data as z.infer<typeof formSchema>,
    };
  }

  redirect("/");
}
