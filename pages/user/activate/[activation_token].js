import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { postData } from "utils/fetchData";
import { DataContext } from "store/GlobalState";

const ActivationEmail = () => {
  const router = useRouter();
  const { activation_token } = router.query;
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await postData("auth/activate_email", {
            activation_token,
          });
          if (res.err) {
            setErr(res.err);
            return dispatch({
              type: "NOTIFY",
              payload: { error: res.err },
            });
          }

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

          setSuccess(res.msg);
          dispatch({
            type: "NOTIFY",
            payload: { success: res.msg },
          });
          await setTimeout(() => {
            router.push("/");
          }, 2000);
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
