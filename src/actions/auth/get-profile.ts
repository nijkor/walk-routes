"use server";
import { createClient } from "@/lib/supabase/server";

import { getClaims } from "./get-claims";

import type { Tables } from "@/types/database";

type Response = {
  ok: boolean;
  data: Tables<"profiles"> | null;
  error: string | null;
};

export async function getProfile(): Promise<Response> {
  try {
    const supabase = await createClient();

    // получаем ID пользователя
    const res = await getClaims();
    if (!res.ok) {
      return {
        ok: true,
        data: null,
        error: null,
      };
    }

    const uid = res.claims.sub as string;

    // получаем его роли
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", uid)
      .single();
    if (error || !data) throw new Error("Произошла ошибка базы данных.");

    return {
      ok: true,
      data,
      error: null,
    };
  } catch (e) {
    return {
      ok: false,
      data: null,
      error: e instanceof Error ? e.message : "",
    };
  }
}
