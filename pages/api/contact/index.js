import connectDB from "utils/connectDB";
import ContactUs from "models/contactModal";
import nodemailer from "nodemailer";
import { validateEmail as isEmail } from "utils/valid";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await contactUs(req, res);
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
            Thank you Mr.${name} for your precious time for the review , 
            in coming days we will try our level best to give more satisfaction to the customer, 
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

const contactUs = async (req, res) => {
  try {
    const { name, email, phone_no, message } = req.body;
    console.log({ name, email, phone_no, message });

    if (!name || !email || !phone_no || !message)
      return res.status(500).json({ err: "Please add all fields." });
    if (!isEmail(email))
      return res.status(500).json({ err: "Invalid emails." });

    new ContactUs({
      name,
      email,
      phone_no,
      message,
    }).save();
    await sendEmail(email, name);
    res.json({ msg: "check your email" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
};
