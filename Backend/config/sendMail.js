import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

const sendMail = async (to, otp) => {
  console.log("EMAIL:", process.env.USER_EMAIL);
  console.log("PASS:", process.env.USER_PASS ? "LOADED" : "NOT LOADED");
  await transporter.sendMail({
    from: `"SkillHive" <${process.env.USER_EMAIL}>`, // ✅ fixed
    to,
    subject: "Reset Your Password",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
  });
};

export default sendMail;
