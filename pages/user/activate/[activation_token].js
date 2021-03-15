import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { postData } from "utils/fetchData";

const ActivationEmail = () => {
  const router = useRouter();
  const { activation_token } = router.query;
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await postData("auth/activate_email", {
            activation_token,
          });
          if (res.err) {
            setErr(res.err);
          }

          setSuccess(res.msg);
        } catch (err) {
          setErr(err);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <BaseLayout>
      <BasePage className="">
        {err && <div className="errMsg">{err}</div>}
        {success && <div className="successMsg">{success}</div>}
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

export default ActivationEmail;
