// /src/app/admin/page.tsx

import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // Immediately redirect to the admin login or dashboard
  redirect("/admin/login"); // You can change this to "/admin/dashboard" later if needed
}
