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

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: "All fields are required"
        });
    }

    try {
        // 📩 Send to business
        await transporter.sendMail({
            from: `"The Beauty Hub Website" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Client Inquiry from ${name}`,
            html: `
            <h2>New Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p>${message}</p>
            `
        });

        // 📲 Auto-reply to client (FIXED POSITION)
        await transporter.sendMail({
            from: `"The Beauty Hub" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "We received your message 💌",
            html: `
            <p>Hello ${name},</p>
            <p>Thank you for contacting The Beauty Hub. We will get back to you shortly.</p>
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


/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
