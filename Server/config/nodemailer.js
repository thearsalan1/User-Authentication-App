import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: "587",
  secure: false, // optional: set to true if using port 465
  auth: {
    user: "9814cb002@smtp-brevo.com",
    pass: "KF4Hm8hdfBnw2jrX", // ✅ corrected key
  },
});

export default transporter;
