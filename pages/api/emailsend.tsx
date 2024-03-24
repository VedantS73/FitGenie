import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { Client, Account } from "appwrite";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const email = req.body.email; // User's email

        const title = req.body.subject;
        const body = req.body.title;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: "sudhakarjha8655@gmail.com",
                pass: "gyowgpmskvqefekc",
            }
        });

        let info = await transporter.sendMail({
            from: 'sudhakarjha8655@gmail.com',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log(info);
        res.status(200).json("Email Sent Successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while sending email." });
    }
}

export default handler;
