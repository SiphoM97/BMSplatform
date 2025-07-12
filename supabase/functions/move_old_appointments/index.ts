// supabase/functions/move_old_appointments/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const today = new Date().toISOString().split("T")[0];

  const { data: oldAppointments, error } = await supabase
    .from("appointments")
    .select("*")
    .lt("date", today);

  if (error || !oldAppointments?.length) {
    return new Response(JSON.stringify({ moved: 0, error }), {
      status: 200,
    });
  }

  const { error: insertError } = await supabase
    .from("past_appointments")
    .insert(oldAppointments);

  const { error: deleteError } = await supabase
    .from("appointments")
    .delete()
    .lt("date", today);

  return new Response(
    JSON.stringify({
      moved: oldAppointments.length,
      insertError,
      deleteError,
    }),
    { status: 200 }
  );
});
