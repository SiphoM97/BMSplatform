import Hero from "@/components/Home/Hero";
import Companies from "@/components/Home/Companies";
import Courses from "@/components/Home/Courses";
import Mentor from "@/components/Home/Mentor";
import Testimonial from "@/components/Home/Testimonials";

import BookingForm from "@/components/Home/BookingForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr Nkuna and Partners",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Companies />
      <Courses />
      <Mentor />
      <Testimonial />
      <BookingForm />
    </main>
  );
}
