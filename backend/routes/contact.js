const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, company, message } = req.body;

  try {
    // 1. Persist Lead to Database
    const newLead = new Lead({ name, email, company, message });
    await newLead.save();

    // 2. Setup Transporter (Gmail/SMTP)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000, // 10 seconds max to try connecting
      greetingTimeout: 10000, // 10 seconds max to wait for Gmail's welcome response
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 3. Notify Team
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "shikharguptaoct13@gmail.com",
      // to: "siddharthbabel082@gmail.com",
      subject: `🚀 New DASS Inquiry: ${company || name}`,
      text: `Lead Details:\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nMessage: ${message}`,
    });

    // 4. Client Auto-Reply
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Arvionyx | Inquiry Received",
      html: `<p>Hi ${name},</p><p>Thank you for reaching out to <b>Arvionyx</b>. We've received your request regarding your DASS needs and will get back to you within 24 hours.</p>`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Backend Error Details:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message, 
      code: err.code,
      command: err.command 
    });
  }
});

module.exports = router;
