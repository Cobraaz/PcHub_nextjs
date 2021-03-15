import { useContext } from "react";
import { Row, Col } from "reactstrap";
import Link from "next/link";
import Cookie from "js-cookie";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import SignInForm from "components/auth/LoginForm";
import { DataContext } from "../store/GlobalState";
import { postData } from "utils/fetchData";

const Login = () => {
  const { state, dispatch } = useContext(DataContext);

  const handleSubmit = async (e, userData) => {
    e.preventDefault();

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("auth/login", userData);

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });

    localStorage.setItem("firstLogin", true);
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
              <h1 className="mb-3">Sign In</h1>
              <SignInForm onSubmit={handleSubmit} />
              <p className="mx-3">
                You don't have a account
                <Link href="/register">
                  <a style={{ color: "crimson" }}> Register Now</a>
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Login;
