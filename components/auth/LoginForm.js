import { useState } from "react";
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
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

const SignInForm = ({ onSubmit }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <motion.form variants={fadeInUp} onSubmit={(e) => onSubmit(e, userData)}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-mail-send-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChangeInput}
          required
        />
      </InputGroup>
      <InputGroup className="mt-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-lock-2-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleChangeInput}
          required
        />
      </InputGroup>
      <InputGroup>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="btn-signin mt-3 btn btn-secondary btn-block"
        >
          Submit
        </motion.button>
      </InputGroup>
    </motion.form>
  );
};

export default SignInForm;
