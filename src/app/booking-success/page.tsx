import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-slateGray flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-6">
          Your booking has been received. A member of the team will contact you to confirm your appointment shortly.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
