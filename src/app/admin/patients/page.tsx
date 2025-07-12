"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Patient = {
  id: string;
  full_name: string;
  phone_number: string;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const [appointmentsRes, pastRes] = await Promise.all([
      supabase.from("appointments").select("full_name, phone_number"),
      supabase.from("past_appointments").select("full_name, phone_number"),
    ]);

    const combined = [
      ...(appointmentsRes.data ?? []),
      ...(pastRes.data ?? []),
    ];

    const unique = Array.from(
      new Map(combined.map((p) => [p.phone_number, p])).values()
    );

    const sorted = unique.sort((a, b) =>
      a.full_name.localeCompare(b.full_name)
    );

    setPatients(sorted);
    setLoading(false);
  };

  const handleRowClick = (phone_number: string) => {
    router.push(`/admin/patients/${phone_number}`);
  };

  const filteredPatients = patients.filter((p) =>
    `${p.full_name} ${p.phone_number}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={["doctor", "receptionist"]}>
      <div>
        <h1 className="text-2xl font-semibold mb-6">Patients</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or phone number..."
            className="border px-3 py-2 rounded w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filteredPatients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <table className="w-full bg-white rounded shadow">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-3">Full Name</th>
                <th className="p-3">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr
                  key={p.phone_number}
                  onClick={() => handleRowClick(p.phone_number)}
                  className="cursor-pointer border-t hover:bg-blue-50 transition"
                >
                  <td className="p-3">{p.full_name}</td>
                  <td className="p-3">{p.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
}
