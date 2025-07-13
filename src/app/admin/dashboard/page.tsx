"use client";

import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Icon } from "@iconify/react";

type Appointment = {
  id: number;
  date: string;
  time: string;
  full_name: string;
  status: string;
  notes: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching appointments:", error.message);
      setLoading(false);
      return;
    }

    setAppointments(data as Appointment[]);
    setLoading(false);
  };

  const today = new Date().toISOString().split("T")[0];
  const now = new Date();

  const todaysAppointments = appointments.filter((a) => a.date === today);
  const upcomingAppointments = appointments.filter((a) => a.date > today);
  const lastWeekAppointments = appointments.filter((a) => {
    const apptDate = new Date(a.date);
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    return apptDate >= lastWeek && apptDate < now;
  });

  return (
    <ProtectedRoute allowedRoles={["doctor", "receptionist"]}>
      <div className="p-6 space-y-10">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today’s Appointments"
            value={todaysAppointments.length}
            icon="tabler:calendar-time"
          />
          <StatCard
            title="Upcoming (7 Days)"
            value={upcomingAppointments.length}
            icon="tabler:calendar-up"
          />
          <StatCard
            title="Pending"
            value={appointments.filter((a) => a.status === "pending").length}
            icon="tabler:alarm"
          />
          <StatCard
            title="Last Week"
            value={lastWeekAppointments.length}
            icon="tabler:history"
            comparison="+8% from previous"
          />
        </div>

        {/* Today’s Appointments Table */}
        <div>
          <h2 className="text-xl font-medium mb-4">Today’s Appointments</h2>
          {todaysAppointments.length === 0 ? (
            <p className="text-gray-500">No appointments for today.</p>
          ) : (
            <table className="w-full bg-white rounded shadow">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {todaysAppointments.map((appt) => (
                  <tr key={appt.id} className="border-t">
                    <td className="p-3">{appt.time}</td>
                    <td className="p-3">{appt.full_name}</td>
                    <td className="p-3 capitalize">{appt.status}</td>
                    <td className="p-3">{appt.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <ActionButton href="/admin/patients" label="View Patients" />
            <ActionButton href="/admin/appointments/new" label="Book Appointment" />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// ✅ Stat Card Component
function StatCard({
  title,
  value,
  icon,
  comparison,
}: {
  title: string;
  value: number;
  icon: string;
  comparison?: string;
}) {
  return (
    <div className="bg-white p-5 rounded shadow flex items-center gap-4">
      <div className="bg-primary/10 p-3 rounded-full text-primary">
        <Icon icon={icon} className="text-2xl" />
      </div>
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {comparison && (
          <p className="text-xs text-green-600 mt-1">{comparison}</p>
        )}
      </div>
    </div>
  );
}

// 🛠️ Action Button Component
function ActionButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="px-5 py-2 rounded bg-primary text-white hover:bg-secondary transition"
    >
      {label}
    </a>
  );
}
