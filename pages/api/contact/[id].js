import connectDB from "utils/connectDB";
import ContactUs from "models/contactModal";
import Authenticated from "middleware/Authenticated";
import Users from "models/userModel";
import AuthenticatedRoot from "middleware/AuthenticatedRoot";
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getContact(req, res);
      break;
    case "DELETE":
      await deleteReply(req, res);
      break;
  }
};

const getContact = Authenticated(
  AuthenticatedRoot(async (req, res) => {
    try {
      const { id } = req.query;
      const { name, email, phone_no, message } = await ContactUs.findById(id);

      let [user] = await Users.find({ email: email });
      let contact;
      if (user) {
        contact = { name, email, phone_no, message, avatar: user.avatar };
      }
      contact = {
        name,
        email,
        phone_no,
        message,
        avatar:
          "https://res.cloudinary.com/cobraaz/image/upload/v1595762337/gez4i626tlesoe3plwn7.jpg",
      };
      res.json({ contact });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  })
);

const deleteReply = Authenticated(
  AuthenticatedRoot(async (req, res) => {
    try {
      const { id } = req.query;
      await ContactUs.findByIdAndDelete(id);
      res.json({ msg: "Success! Deleted a  user review" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: err.message });
    }
  })
);
