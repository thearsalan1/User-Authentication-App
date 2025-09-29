import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.HOST_NAME,
  port: process.env.PORT,
  secure: false, // optional: set to true if using port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.PASSWORD, // ✅ corrected key
  },
});

export default transporter;
