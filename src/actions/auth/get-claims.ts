"use server";

import { createClient } from "@/lib/supabase/server";

type Response =
  | {
      ok: true;
      claims: { [key: string]: unknown };
    }
  | {
      ok: false;
      error: string;
    };

export async function getClaims(): Promise<Response> {
  try {
    const supabase = await createClient();

    // получаем данные пользователя
    const { data: user, error } = await supabase.auth.getClaims();
    if (error || !user) throw new Error(error?.name);

    return {
      ok: true,
      claims: user?.claims,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "",
    };
  }
}
