import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Make sure this is at the top

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // 🔁 changed
  port: Number(process.env.SMTP_PORT), // 🔁 changed
  secure: false,                     // startTLS
  auth: {
    user: process.env.SMTP_USER,     // 🔁 changed
    pass: process.env.SMTP_PASS,     // 🔁 changed
  },
});

// ✅ Verify SMTP connection
transporter.verify((err, success) => {
  if (err) {
    console.log("SMTP VERIFY ERROR:", err);
  } else {
    console.log("SMTP READY ✅");
  }
});

// ✅ Function to send OTP
const sendMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"SkillHive" <${process.env.SMTP_SENDER}>`,   // 🔁 changed
      to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
  } catch (err) {
    throw new Error("OTP error " + err.message);
  }
};

export default sendMail;
