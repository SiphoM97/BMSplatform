import Link from "next/link";
import "@/app/globals.css"; // Ensure your Tailwind is applied

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 pt-28 space-y-6">
        <h1 className="text-xl font-bold text-primary">Patient management</h1>
        <nav className="flex flex-col space-y-3">
          <Link href="/admin/dashboard" className="text-gray-700 hover:text-primary">
            🧭 Dashboard
          </Link>
          <Link href="/admin/appointments" className="text-gray-700 hover:text-primary">
            📅 Appointments
          </Link>
          <Link href="/admin/patients" className="text-gray-700 hover:text-primary">
            🧍 Patients
          </Link>
          <Link href="/admin/profile" className="text-gray-700 hover:text-primary">
            👤 Profile
          </Link>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10 pt-28">{children}</main>
    </div>
  );
}
