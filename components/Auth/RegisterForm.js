import { useState } from "react";
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

const SignInForm = ({ onSubmit }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <motion.form
      initial="initial"
      animate="animate"
      onSubmit={(e) => onSubmit(e, userData)}
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
      </motion.div>
      <motion.div variants={fadeInUp} className="input-group mt-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ri-lock-password-fill"></i>
          </InputGroupText>
        </InputGroupAddon>
        <input
          className="form-control"
          type="password"
          placeholder="Confirm password"
          name="cf_password"
          value={cf_password}
          onChange={handleChangeInput}
          required
        />
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

export default SignInForm;
