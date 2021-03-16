import { useContext } from "react";
import Link from "next/link";
import { Row, Col } from "reactstrap";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import RegisterForm from "components/auth/RegisterForm";
import valid from "utils/valid";
import { DataContext } from "store/GlobalState";
import { postData } from "utils/fetchData";

const Register = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

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
    <BaseLayout>
      <BasePage className="signin-page wrapper">
        <Row>
          <Col
            md={{ size: 6, offset: 3 }}
            sm={{ size: 6, offset: 3 }}
            xs={{ size: 12 }}
          >
            <div className="form-wrapper">
              <h1 className="mb-3">Sign Up</h1>
              <RegisterForm onSubmit={handleSubmit} />
              <p className="mx-3">
                Already have a account
                <Link href="/login">
                  <a style={{ color: "crimson" }}> Login Now</a>
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Register;
