import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);
console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
    "SUPABASE KEY:",
    process.env.SUPABASE_SERVICE_ROLE_KEY ? "✔️ Есть" : "❌ Нет"
);
