"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const full_name = formData.get("full_name") as string;
    const phone_number = formData.get("phone_number") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const notes = formData.get("notes") as string;

    const { error } = await supabase.from("appointments").insert([
      { full_name, phone_number, date, time, notes }
    ]);

    if (error) {
      setLoading(false);
      setErrorMsg("❌ Booking failed: " + error.message);
      return;
    }

    // 📨 Trigger email notification to receptionist
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, phone_number, date, time, notes }),
      });
    } catch (err) {
      console.error("Email send failed", err);
      // Optional: you can choose to show a warning, but don't block redirect
    }

    setLoading(false);
    window.location.href = "/booking-success";
  };

  return (
    <section id="booking" className="bg-slateGray py-20 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">
          Book an Appointment
        </h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-800 px-4 py-3 mb-4 rounded-lg text-center">
            {errorMsg}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleBookingSubmit}>
          <div>
            <label htmlFor="full_name" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Booking Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
              Time Slot
            </label>
            <select
              id="time"
              name="time"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a time</option>
              <option value="10:00">10:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Describe your reason for the visit..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              loading ? "bg-gray-400" : "bg-primary hover:bg-secondary transition"
            }`}
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}
