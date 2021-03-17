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
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import FacebookLogin from "react-facebook-login";
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

  const responseGoogle = async (response) => {
    try {
      const res = await postData("auth/google_login", {
        tokenId: response.tokenId,
      });

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
    } catch (err) {
      console.log(err);
    }
  };

  const responseFacebook = async (response) => {
    console.log(response);
    try {
      const { accessToken, userID } = response;
      const res = await postData("auth/facebook_login", {
        accessToken,
        userID,
      });
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
    } catch (err) {
      console.log(err);
    }
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
              <p className="mx-3">
                You don't have a account
                <Link href="/register">
                  <a className="account-text"> Register Now</a>
                </Link>
              </p>
              <SignInForm onSubmit={handleSubmit} />
              <Link href="/user/forgot_password">
                <a
                  style={{ float: "right", textAlign: "end" }}
                  className="mx-3 account-text"
                >
                  Forgot your password?
                </a>
              </Link>
              <div className="mt-4 text-center">
                Or Sign in with social platforms
                <div className="social-media mt-3">
                  <GoogleLogin
                    clientId={process.env.GOOGLE_CLIENT_ID}
                    render={(renderProps) => (
                      <div className="social-media">
                        <div
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="social-icon"
                        >
                          <i
                            className="ri-google-fill"
                            style={{ fontSize: "1.6em" }}
                          ></i>
                        </div>
                      </div>
                    )}
                    onSuccess={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />

                  <FacebookLogin
                    appId={process.env.FACEBOOK_CLIENT_ID}
                    autoLoad={false}
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <div className="social-media">
                        <div
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="social-icon"
                        >
                          <i
                            className="ri-facebook-fill"
                            style={{ fontSize: "1.6em" }}
                          ></i>
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
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
