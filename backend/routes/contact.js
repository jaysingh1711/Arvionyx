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
    console.log(`Database saved successfully for lead from: ${email}`);

    // List of co-founders to notify
    const cofounders = [
      "shikharguptaoct13@gmail.com",
      "jaypsingh04@gmail.com",
      "siddharthbabel082@gmail.com"
    ];

    // Default Sandbox sender address.
    // Change this to your real custom domain address (e.g. "Arvionyx <info@arvionyx.com>")
    // once your domain is verified on the Resend dashboard!
    const fromAddress = "Arvionyx <onboarding@resend.dev>";

    // 2. Notify Team
    const teamResponse = await resend.emails.send({
      from: fromAddress,
      to: cofounders,
      subject: `🚀 New Inquiry: ${company || name}`,
      text: `Lead Details:\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nMessage: ${message}`,
    });

    if (teamResponse.error) {
      console.error("Resend Team Notification Error Details:", teamResponse.error);
    } else {
      console.log("Team notification email queued successfully:", teamResponse.data);
    }

    // 3. Client Auto-Reply
    // Note: In Sandbox mode, this will return an error because the client email is not verified.
    // Once the custom domain is verified, this will succeed for all clients automatically.
    const clientResponse = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "Welcome to Arvionyx | Inquiry Received",
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #4f46e5; margin-bottom: 20px;">Inquiry Received!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to <strong>Arvionyx</strong>. We have received your message regarding <em>${company || "your business"}</em>, and our team is already reviewing your details.</p>
          <p>We pride ourselves on efficiency and will get back to you within 24 hours to discuss how we can accelerate your automation and data processing workflows.</p>
          <br>
          <p>Best Regards,</p>
          <p><strong>The Arvionyx Team</strong></p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0 15px 0;" />
          <p style="font-size: 11px; color: #718096; text-align: center;">This is an automated confirmation of your request. Please do not reply directly to this email.</p>
        </div>
      `,
    });

    if (clientResponse.error) {
      console.error("Resend Client Confirmation Error Details:", clientResponse.error);
    } else {
      console.log("Client confirmation email queued successfully:", clientResponse.data);
    }

    // Return success to the client
    res.status(200).json({ 
      success: true,
      emailStatus: {
        teamNotified: !teamResponse.error,
        clientNotified: !clientResponse.error
      }
    });

  } catch (err) {
    console.error("Fatal Backend Error Details:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
});

module.exports = router;
