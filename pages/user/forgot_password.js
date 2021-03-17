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
                <h2 className="mb-3">Forgot Your Password?</h2>
                <form className="mt-3" onSubmit={forgotPassword}>
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
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Button type="submit" className="btn-signin mt-3" block>
                      Verify your email
                    </Button>
                  </InputGroup>
                </form>
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
  const isAuth = user ? JSON.parse(user) : false;
  if (!isAuth) {
    withAuth(res, "/");
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ForgotPassword;
