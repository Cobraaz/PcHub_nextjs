import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import SignInForm from "components/LoginForm";
import Link from "next/link";
import Redirect from "components/shared/Redirect";
import { Row, Col, UncontrolledAlert, Spinner } from "reactstrap";
import { toast } from "react-toastify";

const Login = () => {
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
              <SignInForm />
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
