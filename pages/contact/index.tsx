import { useContext, Row, Col, motion } from "helpers/package.import";

import { BaseLayout, BasePage } from "helpers/components.import";
import {
  stagger,
  fadeInUp,
  validateEmail as isEmail,
  DataContext,
  postData,
} from "helpers/helper.functions";
import ContactForm from "components/contact/ContactFrom";
import React from "react";

const Contact: React.FC = () => {
  const { dispatch } = useContext(DataContext);

  const handleSubmit = async (
    e: React.FormEvent,
    contactData: {
      name: String;
      email: String;
      phone_no: String;
      message: String;
    },
    clearFields: () => void
  ) => {
    e.preventDefault();

    try {
      const { name, email, phone_no, message } = contactData;
      if (!name || !email || !phone_no || !message)
        return dispatch({
          type: "NOTIFY",
          payload: { error: "Please add all fields." },
        });

      if (!isEmail(email))
        return dispatch({
          type: "NOTIFY",
          payload: { error: "Invalid emails." },
        });

      dispatch({ type: "NOTIFY", payload: { loading: true } });
      const res = await postData("contact", contactData);

      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      clearFields();
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BaseLayout>
      <BasePage className="signin-page wrapper" title="PcHub Contact Us">
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
                  Drop a Line
                </motion.h1>
                <motion.div variants={fadeInUp}>
                  <ContactForm onSubmit={handleSubmit} />
                </motion.div>
              </motion.div>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Contact;
