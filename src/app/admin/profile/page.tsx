"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({ full_name: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
      }
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: profile.full_name })
      .eq("id", user.id);
    setSaving(false);
  };

  const handleResetPassword = async () => {
    if (user?.email) {
      await supabase.auth.resetPasswordForEmail(user.email);
      alert("📩 Password reset email sent!");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["doctor", "receptionist"]}>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">My Profile</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4 bg-white p-6 rounded shadow max-w-md">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <p className="text-gray-700">{user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Role</label>
              <p className="text-gray-700 capitalize">{profile.role}</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition w-full"
                onClick={handleUpdate}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                className="text-sm text-blue-600 underline block text-center"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
