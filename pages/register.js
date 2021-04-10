import {
  useContext,
  useEffect,
  Row,
  Col,
  Link,
  parseCookies,
  motion,
} from "helpers/package.import";

import { BaseLayout, BasePage, RegisterForm } from "helpers/components.import";

import {
  stagger,
  postData,
  DataContext,
  fadeInUp,
  withAuth,
  valid,
} from "helpers/helper.functions";

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
    <BaseLayout>
      <BasePage className="signin-page wrapper" title="PcHub Registration">
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
                  Sign Up
                </motion.h1>
                <motion.p variants={fadeInUp} className="mx-3 mb-0">
                  Already have a account
                  <Link href="/login">
                    <a className="account-text"> Login Now</a>
                  </Link>
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <RegisterForm onSubmit={handleSubmit} />
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

export default Register;
