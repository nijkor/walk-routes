"use server";

import { createClient } from "@/lib/supabase/server";

type Response = {
  ok: boolean;
};

export async function logout(): Promise<Response> {
  try {
    const supabase = await createClient();

    // выходим
    await supabase.auth.signOut();

    return {
      ok: true,
    };
  } catch (e) {
    return {
      ok: false,
    };
  }
}
