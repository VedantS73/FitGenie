const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
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
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;