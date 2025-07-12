"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="mb-6 text-gray-700">
          You do not have permission to view this page.
        </p>
        <Link
          href="/admin/dashboard"
          className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-secondary"
        >
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
}
