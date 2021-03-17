import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Row, Col } from "reactstrap";
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { patchData } from "utils/fetchData";
import { isLength, isMatch } from "utils/valid";
import { DataContext } from "store/GlobalState";

const ResetPassword = () => {
  const { state, dispatch } = useContext(DataContext);

  const initialState = {
    password: "",
    cf_password: "",
  };

  const [data, setData] = useState(initialState);
  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const router = useRouter();
  const { reset_token } = router.query;
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (isLength(password))
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Password must be at least 6 characters." },
      });

    if (!isMatch(password, cf_password))
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Password did not match." },
      });

    try {
      const res = await patchData(
        "auth/reset_password",
        { password },
        reset_token
      );

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
                <h2 className="mb-3">Reset Your Password</h2>
                <form className="mt-3" onSubmit={handleResetPassword}>
                  <label
                    className="text-capitalize font-weight-bold mx-3"
                    htmlFor="email"
                  >
                    Enter your New Password
                  </label>
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
                  <InputGroup className="mt-3">
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
                  </InputGroup>
                  <InputGroup>
                    <Button type="submit" className="btn-signin mt-3" block>
                      Reset Password
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

export default ResetPassword;
