import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Make sure this is at the top

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,          // Safer for local testing
  secure: false,      // StartTLS
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Prevent TLS errors locally
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
      from: `"SkillHive" <${process.env.USER_EMAIL}>`,
      to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
    // console.log(`OTP sent successfully to ${to} ✅`);
  } catch (err) {
    // console.log("MAIL ERROR:", err);
    throw new Error("OTP error " + err.message);
  }
};

export default sendMail;
