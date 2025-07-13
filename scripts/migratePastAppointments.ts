"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function MigratePastAppointments() {
  useEffect(() => {
    const migrate = async () => {
      const today = new Date().toISOString().split("T")[0];

      // Step 1: Get past appointments
      const { data: pastAppointments, error: fetchError } = await supabase
        .from("appointments")
        .select("*")
        .lt("date", today);

      if (fetchError) {
        console.error("❌ Fetch error:", fetchError.message);
        return;
      }

      if (!pastAppointments || pastAppointments.length === 0) {
        console.log("✅ No past appointments to migrate.");
        return;
      }

      // Step 2: Insert into past_appointments
      const { error: insertError } = await supabase
        .from("past_appointments")
        .insert(pastAppointments);

      if (insertError) {
        console.error("❌ Insert error:", insertError.message);
        return;
      }

      // Step 3: Delete from appointments
      const idsToDelete = pastAppointments.map((a) => a.id);
      const { error: deleteError } = await supabase
        .from("appointments")
        .delete()
        .in("id", idsToDelete);

      if (deleteError) {
        console.error("❌ Delete error:", deleteError.message);
        return;
      }

      console.log(`✅ Migrated and removed ${idsToDelete.length} past appointments.`);
    };

    migrate();
  }, []);

//   return <p className="p-4">⏳ Migrating past appointments... Check console for result.</p>;
// }
}