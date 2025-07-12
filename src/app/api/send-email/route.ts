import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, phone_number, date, time, notes } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Dr Nkuna Bookings" <${process.env.EMAIL_USER}>`,
      to: "teaminnovation238@gmail.com", // replace with real receptionist email
      subject: "🩺 New Appointment Booking",
      text: `
New appointment booking received:

Name: ${full_name}
Phone: ${phone_number}
Date: ${date}
Time: ${time}
Notes: ${notes || "None"}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Email send failed" }, { status: 500 });
  }
}
