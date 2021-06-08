import React, { useState } from "react";
import { InputGroupText, InputGroupAddon } from "reactstrap";
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

type ContactFormProps = {
  onSubmit: (
    e: React.FormEvent,
    contactData: {
      name: String;
      email: String;
      phone_no: String;
      message: String;
    },
    clearFields: () => void
  ) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const initialState = {
    name: "",
    email: "",
    phone_no: "",
    message: "",
  };
  const [contactData, setContactData] = useState(initialState);
  const { email, name, message, phone_no } = contactData;

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };
  const clearFields = () => {
    setContactData(initialState);
  };
  return (
    <motion.form
      initial="initial"
      animate="animate"
      onSubmit={(e) => onSubmit(e, contactData, clearFields)}
    >
      <motion.div variants={fadeInUp} className="input-group">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-user-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={handleChangeInput}
        />
      </motion.div>
      <motion.div variants={fadeInUp} className="input-group mt-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-mail-send-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChangeInput}
          required
        />
      </motion.div>
      <motion.div variants={fadeInUp} className="input-group mt-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-smartphone-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          name="phone_no"
          placeholder="Phone no."
          required
          value={phone_no}
          type="tel"
          onChange={handleChangeInput}
        />
      </motion.div>
      <motion.div variants={fadeInUp} className="input-group mt-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-message-3-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <textarea
          rows={2}
          className="form-control"
          name="message"
          placeholder="Message"
          required
          value={message}
          onChange={handleChangeInput}
        ></textarea>
      </motion.div>
      <motion.div variants={fadeInUp} className="input-group mt-3">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="btn-signin mt-3 btn btn-secondary btn-block"
        >
          Submit
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
