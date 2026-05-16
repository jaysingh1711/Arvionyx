const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  const { name, email, company, message } = req.body;

  try {
    // 1. Persist Lead to Database
    const newLead = new Lead({ name, email, company, message });
    await newLead.save();

    // 2. Notify Team via Resend
    await resend.emails.send({
      from: "Arvionyx <onboarding@resend.dev>",
      to: "shikharguptaoct13@gmail.com",
      subject: `🚀 New Inquiry: ${company || name}`,
      text: `Lead Details:\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nMessage: ${message}`,
    });

    // 3. Client Auto-Reply
    // Note: On Resend free tier, you can only send to yourself until you verify a domain.
    await resend.emails.send({
      from: "Arvionyx <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Arvionyx | Inquiry Received",
      html: `<p>Hi ${name},</p><p>Thank you for reaching out to <b>Arvionyx</b>. We've received your request and will get back to you within 24 hours.</p>`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Backend Error Details:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

module.exports = router;
