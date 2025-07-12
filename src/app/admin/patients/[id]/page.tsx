"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  doctor_notes: string;
};

function PatientDetails() {
  const params = useParams();
  const phoneNumber = params?.id as string;

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editNotes, setEditNotes] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [phoneNumber]);

  const fetchAppointments = async () => {
    setLoading(true);

    const [upcomingRes, pastRes] = await Promise.all([
      supabase
        .from("appointments")
        .select("*")
        .eq("phone_number", phoneNumber),
      supabase
        .from("past_appointments")
        .select("*")
        .eq("phone_number", phoneNumber),
    ]);

    const allData = [
      ...(upcomingRes.data ?? []),
      ...(pastRes.data ?? []),
    ] as Appointment[];

    const sorted = allData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setAppointments(sorted);
    setLoading(false);
  };

  const updateDoctorNotes = async (id: string, notes: string) => {
    setSavingId(id);
    const { error } = await supabase
      .from("appointments")
      .update({ doctor_notes: notes })
      .eq("id", id);

    setSavingId(null);
    fetchAppointments();
  };

  const latestAppointment = appointments[0];

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-semibold mb-4">Patient File</h1>

      {loading ? (
        <p>Loading patient info...</p>
      ) : appointments.length === 0 ? (
        <p>No records found for this patient.</p>
      ) : (
        <>
          <div className="bg-white p-6 rounded shadow-md space-y-2">
            <h2 className="text-xl font-semibold text-primary">👤 {latestAppointment.full_name}</h2>
            <p>📞 Phone: {latestAppointment.phone_number}</p>
            <p>📆 Last Visit: {latestAppointment.date}</p>
            <p>🧾 Total Visits: {appointments.length}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Visit History</h3>
            <table className="w-full table-auto bg-white rounded shadow text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3 text-left">Receptionist Notes</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Doctor Notes</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="border-t">
                    <td className="p-3">{appt.date}</td>
                    <td className="p-3">{appt.time}</td>
                    <td className="p-3">{appt.notes}</td>
                    <td className="p-3">{appt.receptionist_notes}</td>
                    <td className="p-3">{appt.status}</td>
                    <td className="p-3 space-y-2">
                      <textarea
                        className="w-full border rounded px-2 py-1"
                        rows={2}
                        placeholder="Doctor notes..."
                        value={editNotes[appt.id] ?? appt.doctor_notes ?? ""}
                        onChange={(e) =>
                          setEditNotes((prev) => ({
                            ...prev,
                            [appt.id]: e.target.value,
                          }))
                        }
                      />
                      {/* Only allow editing if the record is from "appointments", not "past_appointments" */}
                      {"status" in appt && (
                        <button
                          className="bg-primary text-white text-xs px-3 py-1 rounded hover:bg-secondary"
                          onClick={() =>
                            updateDoctorNotes(
                              appt.id,
                              editNotes[appt.id] ?? ""
                            )
                          }
                          disabled={savingId === appt.id}
                        >
                          {savingId === appt.id ? "Saving..." : "Save"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default function PatientDetailsPage() {
  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <PatientDetails />
    </ProtectedRoute>
  );
}
