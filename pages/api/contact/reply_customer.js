import connectDB from "utils/connectDB";
import ContactUs from "models/contactModal";
import nodemailer from "nodemailer";
import { validateEmail as isEmail } from "utils/valid";
import Authenticated from "middleware/Authenticated";
import AuthenticatedRoot from "middleware/AuthenticatedRoot";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await replyCustomer(req, res);
      break;
  }
};

const sendEmail = (to, name) => {
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
            <p>Dear Sir,
            <br/>
            Thank you Mr.${name} for your precious time for the review, 
            in coming days. I will try to remove the problem that you identify
            <br/>
            <span style="font-weight: bold;">Message from owner of the website i.e ANUJ BANSAL</span>
            <br/>
            Regards,
            <br/>
            Anuj bansal
            </p>
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

const replyCustomer = Authenticated(
  AuthenticatedRoot(async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email)
        return res.status(500).json({ err: "Please add all fields." });
      if (!isEmail(email))
        return res.status(500).json({ err: "Invalid emails." });
      await sendEmail(email, name);
      res.json({ msg: "Thank you, Mail Send" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  })
);
