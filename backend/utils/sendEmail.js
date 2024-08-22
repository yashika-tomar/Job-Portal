import nodeMailer from 'nodemailer';


export const sendEmail = async({email, subject, message})=>{
            const transporter = nodeMailer.createTransport({
                        host:process.env.SMTP_HOST,
                        service:process.env.SMTP_SERVICE,
                        port:process.env.SMTP_PORT,
                        auth:{
                        user:process.env.SMTP_MAIL,
                        pass:process.env.SMTP_PASS
                        },
            });

            const options = {
                        from: process.env.SMPT_MAIL,
                        to: email,
                        subject: subject,
                        text:message
            }

            await transporter.sendMail(options);
}