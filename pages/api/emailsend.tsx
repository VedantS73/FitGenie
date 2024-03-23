import { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const email = req.body.email
      const title = req.body.subject
      const body = req.body.title
      
      let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        auth:{
            user: "sudhakarjha8655@gmail.com",
            pass: "gyowgpmskvqefekc",
        }
    })

    let info = await transporter.sendMail({
        from: 'StudyNotion || Horror',
        to:`${email}`,
        subject: `${title}`,
        html: `${body}`,
    })
    console.log(info);
    res.status(200).json("Email Sent Successfully");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while sending email." });
    }
  }
  
export default handler;