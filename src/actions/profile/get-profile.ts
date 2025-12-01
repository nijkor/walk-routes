"use server";
import { createClient } from "@/lib/supabase/server";
import { getClaims } from "@/actions/auth";

import type { Tables } from "@/types/database";

type Response =
  | {
      ok: true;
      data: Tables<"profiles">;
    }
  | {
      ok: false;
      error: string;
    };

export async function getProfile(): Promise<Response> {
  try {
    // получаем id пользователя
    const claims = await getClaims();
    if (!claims.ok) throw new Error(claims.error);

    const uid = claims.claims.sub;

    const supabase = await createClient();

    // получаем инфо о пользователе
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", uid)
      .maybeSingle();
    if (!data || error)
      throw new Error(error?.message || "Профиль пользователя не найден.");

    return {
      ok: true,
      data,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: e instanceof Error ? e.message : "",
    };
  }
}
