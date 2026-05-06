import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(express.static("../public")); 
app.post("/book-room", async (req, res) => { 
    const booking = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailoptions = {
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
    };

    try {
        await transporter.sendMail(mailoptions);
        res.json({
            message: "Room booked successfully! Confirmation email sent"
        });
    } catch (error) {
        console.error("MAIL ERROR:", error);
        res.status(500).json({
            message: "Booking done but mail failed"
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});