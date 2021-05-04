import {
  useState,
  useContext,
  useEffect,
  useRouter,
  Row,
  Col,
  InputGroupText,
  InputGroupAddon,
  Button,
  InputGroup,
  Label,
  Input,
  parseCookies,
} from "helpers/package.import";

import { BaseLayout, BasePage } from "helpers/components.import";

import { DataContext, getData, patchData } from "helpers/helper.functions";

const ResetPassword = () => {
  const router = useRouter();
  const { id } = router.query;
  const [editUser, setEditUser] = useState([]);

  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, users } = state;
  const [num, setNum] = useState(0);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [callback, setCallback] = useState(false);

  // useEffect(() => {
  //   if (auth.user && auth.user.role === "root") {
  //     getData("user/all_infor", auth.token).then((res) => {
  //       if (res.err)
  //         return dispatch({ type: "NOTIFY", payload: { error: res.err } });
  //       dispatch({
  //         type: "GET_ALL_USERS",
  //         payload: res.users,
  //       });
  //     });
  //   }
  // }, [auth.token, auth.user, callback]);

  useEffect(() => {
    if (users && users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === "admin" ? true : false);
          return;
        }
      });
    }
  }, [users, id, router, callback]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (num % 2 !== 0) {
        const res = await patchData(
          `user/update_users_role/${editUser._id}`,
          { role: checkAdmin ? "admin" : "user" },
          auth.token
        );
        setNum(0);
        setCallback(!callback);
        return setSuccess(res.msg);
      }
    } catch (err) {
      setErr(err);
    }
  };

  const handleCheck = () => {
    setSuccess("");
    setErr("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };

  return (
    <BaseLayout>
      <BasePage
        className="signin-page wrapper"
        title={`PcHub ${
          editUser && editUser.name ? editUser.name : ""
        } Profile`}
      >
        {err && <div className="errMsg">{err}</div>}
        {success && <div className="successMsg">{success}</div>}
        <div className="mt-5">
          <Row>
            <Col
              md={{ size: 6, offset: 3 }}
              sm={{ size: 6, offset: 3 }}
              xs={{ size: 12 }}
            >
              <div className="form-wrapper">
                <h2 className="mb-3">Edit User</h2>
                <form className="mt-3" onSubmit={handleUpdate}>
                  <label
                    className="text-capitalize font-weight-bold mx-3"
                    htmlFor="name"
                  >
                    User Name
                  </label>
                  <InputGroup className="mt-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ri-user-fill"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <input
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      defaultValue={editUser.name}
                      disabled
                    />
                  </InputGroup>
                  <InputGroup className="mt-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ri-mail-send-fill"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      name="email"
                      defaultValue={editUser.email}
                      disabled
                    />
                  </InputGroup>
                  <div
                    className="text-center ml-4"
                    style={{ width: "655px", margin: "auto" }}
                  >
                    <InputGroup>
                      <Label check htmlFor="isAdmin">
                        <Input
                          type="checkbox"
                          id="isAdmin"
                          checked={checkAdmin}
                          onChange={handleCheck}
                        />
                        isAdmin
                      </Label>
                    </InputGroup>
                  </div>
                  <InputGroup>
                    <Button type="submit" className="btn-signin mt-3" block>
                      Update
                    </Button>
                  </InputGroup>
                </form>
              </div>
            </Col>
          </Row>
        </div>
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

export async function getServerSideProps(ctx) {
  // some auth logic here
  const { res } = ctx;
  const { user } = parseCookies(ctx);
  const isAuth = user ? JSON.parse(user) : false;

  if (
    !isAuth ||
    isAuth.role == "" ||
    isAuth.role == "user" ||
    !isAuth.role == "root"
  ) {
    withAuth(res, "/");
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ResetPassword;
