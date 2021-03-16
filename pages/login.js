import { useContext } from "react";
import { Row, Col } from "reactstrap";
import Link from "next/link";
import Cookie from "js-cookie";
import { parseCookies } from "nookies";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import SignInForm from "components/auth/LoginForm";
import { DataContext } from "store/GlobalState";
import { postData } from "utils/fetchData";
import { useRouter } from "next/router";
import { withAuth } from "utils/auth";
import { validateEmail as isEmail, isLength } from "utils/valid";

const Login = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);

  const handleSubmit = async (e, userData) => {
    e.preventDefault();
    const { email, password } = userData;

    if (!isEmail(email))
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Invalid emails." },
      });

    if (isLength(password))
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Password must be at least 6 characters." },
      });

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

    Cookie.set("user", res.user, {
      expires: 7,
    });

    localStorage.setItem("firstLogin", true);
    dispatch({
      type: "NOTIFY",
      payload: { success: res.msg },
    });
    return router.push("/");
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
              <Link href="/user/forgot_password">
                <a
                  style={{ float: "right", textAlign: "end" }}
                  className="mx-3"
                >
                  Forgot your password?
                </a>
              </Link>
              <p className="mx-3 mt-2">
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

export async function getServerSideProps(ctx) {
  // some auth logic here
  const { res } = ctx;
  const { user } = parseCookies(ctx);
  const isAuth = user ? JSON.parse(user) : false;
  if (isAuth) {
    withAuth(res, "/");
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Login;
