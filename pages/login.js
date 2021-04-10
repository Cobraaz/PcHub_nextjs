import {
  useContext,
  useEffect,
  useRouter,
  Row,
  Col,
  Link,
  Cookie,
  parseCookies,
  motion,
  GoogleLogin,
  FacebookLogin,
  GitHubLogin,
  parse,
} from "helpers/package.import";

import { BaseLayout, BasePage, SignInForm } from "helpers/components.import";
import {
  stagger,
  postData,
  DataContext,
  fadeInUp,
  withAuth,
  validateEmail as isEmail,
  isLength,
} from "helpers/helper.functions";

const Login = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  const onLogin = (res) => {
    try {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: res.access_token,
          user: res.user,
        },
      });

      const { name, email: emailNew, role } = res.user;

      Cookie.set("user", { name, email: emailNew, role }, { expires: 7 });

      Cookie.set("refreshtoken", res.refresh_token, {
        path: "api/auth/accessToken",
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

  const handleSubmit = async (e, userData) => {
    e.preventDefault();
    try {
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

      onLogin(res);
    } catch (err) {
      console.log(err);
    }
  };

  const responseGoogle = async (response) => {
    try {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const res = await postData("auth/google_login", {
        tokenId: response.tokenId,
      });
      onLogin(res);
    } catch (err) {
      console.log(err);
    }
  };

  const responseFacebook = async (response) => {
    try {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const { accessToken, userID } = response;
      const res = await postData("auth/facebook_login", {
        accessToken,
        userID,
      });
      onLogin(res);
    } catch (err) {
      console.log(err);
    }
  };

  const responseGithub = async (response) => {
    try {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const res = await postData("auth/github_login", { code: response.code });
      onLogin(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    document.getElementById("github").className = "ri-github-fill";
    document.getElementById("github").style.fontSize = "1.6em";
  }, []);

  return (
    <BaseLayout>
      <BasePage className="signin-page wrapper" title="PcHub Sign In">
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
                  Sign In
                </motion.h1>
                <motion.p variants={fadeInUp} className="mx-3">
                  You don't have a account
                  <Link href="/register">
                    <a className="account-text"> Register Now</a>
                  </Link>
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <SignInForm onSubmit={handleSubmit} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Link href="/user/forgot_password">
                    <a
                      style={{ float: "right", textAlign: "end" }}
                      className="mx-3 account-text"
                    >
                      Forgot your password?
                    </a>
                  </Link>
                </motion.div>
                <motion.div variants={fadeInUp} className="mt-4 text-center">
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

                    <GitHubLogin
                      clientId={process.env.GITHUB_CLIENT_ID}
                      redirectUri=""
                      onSuccess={responseGithub}
                      className="social-icon"
                      buttonText={parse(`<i id="github"></i>`)}
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
                </motion.div>
              </motion.div>
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
  const isAuth = user ? true : false;
  if (isAuth) {
    withAuth(res, "/");
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Login;
