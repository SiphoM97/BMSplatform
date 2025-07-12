"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProtectedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        // Not logged in
        router.replace("/admin/login");
        return;
      }

      const userRole = user.user_metadata?.role;

      if (!userRole || !allowedRoles.includes(userRole)) {
        // Logged in, but not authorized
        router.replace("/unauthorized");
        return;
      }

      setAuthorized(true);
      setLoading(false);
    };

    checkAccess();
  }, [allowedRoles, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Checking permissions...
      </div>
    );
  }

  return <>{authorized ? children : null}</>;
}
