import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/book-room", async (req, res) => {
    const booking = req.body;

    try {
        await resend.emails.send({
            from: process.env.EMAIL, 
            to: booking.email,
            subject: "Hotel Booking Confirmation",
            text: `Hello ${booking.name},

Your room has been booked successfully

Check-in : ${booking.checkin}
Check-out : ${booking.checkout}
Room Type : ${booking.room}
Guests : ${booking.guests}

Thank you for choosing our hotel.`
        });

        res.json({
            message: "Room booked successfully! Confirmation email sent"
        });

    } catch (error) {
        console.error("FULL ERROR:", error);
        res.status(500).json({
            message: "Booking done but mail failed"
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});