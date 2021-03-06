var nodemailer = require("nodemailer");

const sendEmail = (to, url, txt) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "anujbansal077@gmail.com",
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "anujbansal077@gmail.com",
    to: to,
    subject: "PcHub Store",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the PcHub Store.</h2>
            <p>Congratulations! You're almost set to start using Pchub✮Store.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendEmail;
