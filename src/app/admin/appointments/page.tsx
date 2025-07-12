"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Appointment = {
  id: string;
  full_name: string;
  phone_number: string;
  date: string;
  time: string;
  notes: string;
  status: string;
  receptionist_notes: string;
};

export default function AppointmentsPage() {
  return (
    <ProtectedRoute allowedRoles={["doctor", "receptionist"]}>
      <AppointmentsContent />
    </ProtectedRoute>
  );
}

function AppointmentsContent() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noteEdits, setNoteEdits] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [tab]);

  const fetchAppointments = async () => {
    setLoading(true);
    const table = tab === "past" ? "past_appointments" : "appointments";

    let query = supabase
      .from(table)
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (tab === "upcoming") {
      const today = new Date().toISOString().split("T")[0];
      query = query.gte("date", today);
    }

    const { data, error } = await query;

    if (error) {
      setError(`❌ Failed to fetch ${tab} appointments.`);
      setAppointments([]);
    } else {
      setAppointments(data as Appointment[]);
    }

    setLoading(false);
  };

  const updateAppointment = async (
    id: string,
    field: "status" | "receptionist_notes",
    value: string
  ) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, [field]: value } : appt
      )
    );

    setSavingId(id);

    const { error } = await supabase
      .from("appointments")
      .update({ [field]: value })
      .eq("id", id);

    setSavingId(null);

    if (error) {
      console.error("Supabase update error:", error.message);
      fetchAppointments();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Appointments</h1>

        <div className="flex items-center gap-3">
          <button
            className={`px-4 py-2 rounded ${
              tab === "upcoming"
                ? "bg-primary text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => setTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded ${
              tab === "past"
                ? "bg-primary text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => setTab("past")}
          >
            Past
          </button>
        </div>
      </div>

      {/* ➕ Walk-In Button (Only for upcoming) */}
      {tab === "upcoming" && (
        <div className="mb-4">
          <Link href="/admin/appointments/new">
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary">
              ➕ New Walk-In
            </button>
          </Link>
        </div>
      )}

      {/* Appointments Table */}
      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : appointments.length === 0 ? (
        <p>No {tab} appointments found.</p>
      ) : (
        <table className="w-full table-auto bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Time</th>
              <th className="p-3">Date</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Phone Number</th>
              <th className="p-3">Patient Notes</th>
              {tab === "upcoming" && <th className="p-3">Status</th>}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-t">
                <td className="p-3">{appt.time}</td>
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.full_name}</td>
                <td className="p-3">{appt.phone_number}</td>
                <td className="p-3 space-y-2">
                  <textarea
                    className="border px-2 py-1 rounded w-full"
                    placeholder="Add notes"
                    value={noteEdits[appt.id] ?? appt.receptionist_notes ?? ""}
                    onChange={(e) =>
                      setNoteEdits((prev) => ({
                        ...prev,
                        [appt.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateAppointment(
                        appt.id,
                        "receptionist_notes",
                        noteEdits[appt.id] ?? ""
                      )
                    }
                    className="mt-1 text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    {savingId === appt.id ? "Saving..." : "Save"}
                  </button>
                </td>
                {tab === "upcoming" && (
                  <td className="p-3">
                    <select
                      value={appt.status}
                      onChange={(e) =>
                        updateAppointment(appt.id, "status", e.target.value)
                      }
                      className={`border rounded px-2 py-1 w-full
                      ${
                        appt.status === "confirmed"
                          ? "bg-green-100"
                          : appt.status === "cancelled"
                          ? "bg-red-100"
                          : "bg-white"
                      }
                    `}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
