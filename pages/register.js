import { useContext, useEffect } from "react";
import Link from "next/link";
import { Row, Col } from "reactstrap";
import { parseCookies } from "nookies";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import RegisterForm from "components/auth/RegisterForm";
import valid from "utils/valid";
import { DataContext } from "store/GlobalState";
import { postData } from "utils/fetchData";
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

const Register = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  const handleSubmit = async (e, userData) => {
    e.preventDefault();
    const { name, email, password, cf_password } = userData;

    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <BaseLayout>
        <motion.div variants={stagger}>
          <motion.div variants={fadeInUp}>
            <BasePage className="signin-page wrapper">
              <Row>
                <Col
                  md={{ size: 6, offset: 3 }}
                  sm={{ size: 6, offset: 3 }}
                  xs={{ size: 12 }}
                >
                  <div className="form-wrapper">
                    <motion.h1
                      animate={{ x: 0, opacity: 1 }}
                      initial={{ x: 200, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-3"
                    >
                      Sign Up
                    </motion.h1>
                    <p className="mx-3 mb-0">
                      Already have a account
                      <Link href="/login">
                        <a className="account-text"> Login Now</a>
                      </Link>
                    </p>
                    <RegisterForm onSubmit={handleSubmit} />
                  </div>
                </Col>
              </Row>
            </BasePage>
          </motion.div>
        </motion.div>
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

export default Register;
