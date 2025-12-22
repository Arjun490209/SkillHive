import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",       
  port: 587, 
  secure: false,                    
  auth: {
    user: process.env.GMAIL_USER,   
    pass: process.env.GMAIL_PASS,     
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
      from: `"SkillHive" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
  } catch (err) {
    throw new Error("OTP error " + err.message);
  }
};

export default sendMail;





// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// let transporter;

// // console.log("🔧 NODE_ENV:", process.env.NODE_ENV);
// // console.log("🔧 SMTP_USER:", process.env.SMTP_USER);
// // console.log("🔧 SMTP_PASS length:", process.env.SMTP_PASS?.length);
// // console.log("🔧 GMAIL_USER:", process.env.GMAIL_USER);
// // console.log("🔧 GMAIL_PASS length:", process.env.GMAIL_PASS?.length);


// // ✅ Environment based config
// if (process.env.NODE_ENV === "production") {
//   transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",   // ✅ hardcode for Render
//     port: 2525,                     // ✅ Render-safe port
//     secure: false,
//     auth: {
//       user: "apikey",               // ✅ Brevo fixed user
//       pass: process.env.SMTP_PASS,  // ✅ only secret from env
//     },
//     connectionTimeout: 10000,
//     greetingTimeout: 10000,
//     socketTimeout: 10000,
//   });
// } else {
//   // Development → Gmail
//   transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     },
//   });
// }

// // ✅ Verify SMTP
// transporter.verify((err) => {
//   if (err) {
//     console.log("❌ SMTP VERIFY ERROR:", err.message);
//   } else {
//     console.log("✅ SMTP READY");
//   }
// });

// // ✅ Send OTP
// const sendMail = async (to, otp) => {
//   try {
//     const fromEmail =
//       process.env.NODE_ENV === "production"
//         ? process.env.SMTP_SENDER
//         : process.env.GMAIL_USER;

//     await transporter.sendMail({
//       from: `"SkillHive" <${fromEmail}>`,
//       to,
//       subject: "Reset Your Password",
//       html: `
//         <h3>OTP Verification</h3>
//         <p>Your OTP is: <b>${otp}</b></p>
//         <p>Expires in 5 minutes</p>
//       `,
//     });
//   } catch (err) {
//     console.log("❌ MAIL ERROR:", err.message);
//     throw new Error("OTP error " + err.message);
//   }
// };

// export default sendMail;
