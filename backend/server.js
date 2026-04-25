"use strict";

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= EMAIL CONFIG ================= */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/* ================= ROUTES ================= */
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: "All fields are required"
        });
    }

    try {
        await transporter.sendMail({
            from: `"The Beauty Hub Website" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Client Inquiry from ${name}`,

            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9fafb;">
                <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px;">

                    <h2 style="color: #2563eb;">New Client Message</h2>

                    <p>You have received a new inquiry from your website.</p>

                    <hr>

                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>

                    <p><strong>Message:</strong></p>
                    <p style="background: #f1f5f9; padding: 12px; border-radius: 8px;">
                        ${message}
                    </p>

                    <hr>

                    <p style="font-size: 12px; color: #555;">
                        This message was sent from The Beauty Hub website contact form.
                    </p>

                </div>
            </div>
            `
        });

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.error("Email error:", error);

        res.status(500).json({
            success: false,
            error: "Failed to send email"
        });
    }
});

await transporter.sendMail({
    from: `"The Beauty Hub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "We received your message 💌",
    html: `
    <div style="font-family: Arial; padding: 20px;">
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting <strong>The Beauty Hub</strong>.</p>
        <p>We have received your message and will get back to you shortly.</p>

        <br>

        <p>Kind regards,<br>The Beauty Hub Team</p>
    </div>
    `
});

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
