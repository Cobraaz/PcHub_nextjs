import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import RegisterForm from "components/RegisterForm";
import Link from "next/link";
import Redirect from "components/shared/Redirect";
import { Row, Col, UncontrolledAlert, Spinner } from "reactstrap";
import { toast } from "react-toastify";

const Register = () => {
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
              <RegisterForm />
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
