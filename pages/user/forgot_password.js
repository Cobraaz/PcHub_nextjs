import {
  useState,
  useContext,
  Row,
  Col,
  motion,
  parseCookies,
  InputGroupText,
  InputGroupAddon,
} from "helpers/package.import";

import { BaseLayout, BasePage } from "helpers/components.import";

import {
  stagger,
  DataContext,
  fadeInUp,
  validateEmail as isEmail,
  postData,
  withAuth,
} from "helpers/helper.functions";

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
    <BaseLayout>
      <BasePage
        className="signin-page wrapper"
        title="PcHub Password Assistance"
      >
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
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0 }}
                  variants={stagger}
                >
                  <motion.h1 variants={fadeInUp} className="mb-3">
                    Forgot Your Password?
                  </motion.h1>
                  <form className="mt-3" onSubmit={forgotPassword}>
                    <motion.label
                      variants={fadeInUp}
                      className="text-capitalize font-weight-bold mx-3"
                      htmlFor="email"
                    >
                      Enter your email address
                    </motion.label>
                    <motion.div variants={fadeInUp} className="input-group">
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
                    </motion.div>
                    <motion.div variants={fadeInUp} className="input-group">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        className="btn-signin mt-3 btn btn-secondary btn-block"
                      >
                        Verify your email
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              </div>
            </Col>
          </Row>
        </div>
      </BasePage>
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
