import { useState, useContext } from "react";
import { Row, Col } from "reactstrap";
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import { parseCookies } from "nookies";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { postData } from "utils/fetchData";
import { validateEmail as isEmail } from "utils/valid";
import { DataContext } from "store/GlobalState";
import { withAuth } from "utils/auth";
import { motion } from "framer-motion";
let easing = [0.6, -0.05, 0.01, 0.99];
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

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

const ForgotPassword = () => {
  const { state, dispatch } = useContext(DataContext);

  const initialState = {
    email: "",
  };
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const [data, setData] = useState(initialState);

  const { email } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    if (!isEmail(email))
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Invalid emails." },
      });

    try {
      const res = await postData("auth/forgot_password", { email });
      if (res.err) {
        setErr(res.err);
      }
      return setSuccess(res.msg);
    } catch (err) {
      setErr(err);
    }
  };

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <BaseLayout>
        <motion.div variants={stagger}>
          <motion.div variants={fadeInUp}>
            <BasePage className="signin-page wrapper">
              {err && <div className="errMsg">{err}</div>}
              {success && <div className="successMsg">{success}</div>}
              <div className="mt-5">
                <Row>
                  <Col
                    md={{ size: 6, offset: 3 }}
                    sm={{ size: 6, offset: 3 }}
                    xs={{ size: 12 }}
                  >
                    <div className="form-wrapper">
                      <motion.h2
                        animate={{ x: 0, opacity: 1 }}
                        initial={{ x: 200, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-3"
                      >
                        Forgot Your Password?
                      </motion.h2>
                      <motion.form
                        variants={fadeInUp}
                        className="mt-3"
                        onSubmit={forgotPassword}
                      >
                        <label
                          className="text-capitalize font-weight-bold mx-3"
                          htmlFor="email"
                        >
                          Enter your email address
                        </label>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ri-mail-send-fill"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={handleChangeInput}
                            placeholder="Email Address"
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
                            Verify your email
                          </motion.button>
                        </InputGroup>
                      </motion.form>
                    </div>
                  </Col>
                </Row>
              </div>
            </BasePage>
          </motion.div>
        </motion.div>
        <style jsx>{`
          .errMsg {
            background: rgb(214, 10, 10);
            color: #fff9;
            text-align: center;
            padding: 10px 0;
            letter-spacing: 1.3px;
          }

          .successMsg {
            background: rgb(9, 158, 54);
            color: #fff9;
            text-align: center;
            padding: 10px 0;
            letter-spacing: 1.3px;
          }
        `}</style>
      </BaseLayout>
    </motion.div>
  );
};

export async function getServerSideProps(ctx) {
  // some auth logic here
  const { res } = ctx;
  const { user } = parseCookies(ctx);
  const isAuth = user ? true : false;
  if (isAuth) {
    withAuth(res, "/");
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ForgotPassword;
