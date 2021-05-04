import {
  useState,
  useContext,
  useEffect,
  useRouter,
  Link,
  Image,
  parseCookies,
  imageCompression,
} from "helpers/package.import";

import { BaseLayout, BasePage, Modal } from "helpers/components.import";

import {
  DataContext,
  withAuth,
  valid,
  deleteData,
  getData,
  patchData,
  formatDate,
} from "helpers/helper.functions";
import Hero from "components/Profile/Hero";

const Profile = () => {
  const router = useRouter();
  const initialState = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };

  const [data, setData] = useState(initialState);
  const [callback, setCallback] = useState(false);
  const { avatar, cf_password, name, password } = data;

  const { state, dispatch } = useContext(DataContext);
  const { auth, notify, users, orders, modal, contacts } = state;
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  useEffect(() => {
    if (Object.keys(auth).length === 0) router.push("/");
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  useEffect(() => {
    if (auth.user && auth.user.role === "root") {
      getData("user/all_infor", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        dispatch({
          type: "GET_ALL_USERS",
          payload: res.users,
        });
      });
      getData("contact", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        dispatch({
          type: "ALL_CONTACT_US",
          payload: res.contact,
        });
      });
    }
  }, [callback]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }

    if (name !== auth.user.name || avatar) updateInfor();
  };

  const updatePassword = async () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await patchData(
      "auth/reset_password",
      { password },
      auth.token
    );
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const changeAvatar = async (e) => {
    let file;
    file = await imageCompression(e.target.files[0], {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.3, // optional, initial quality value between 0 and 1 (default: 1)
    });
    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File does not exist." },
      });

    if (file.size > 1024 * 1024)
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "The largest image size is 1mb." },
      });

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image format is incorrect." },
      });

    file = await toBase64(file);
    setData({ ...data, avatar: file });
  };

  const updateInfor = async () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(
      "user/update_infor",
      {
        name,
        avatar: avatar ? avatar : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const handleDelete = async (user) => {
    try {
      if (auth.user.id !== user._id) {
        toggleModal();
        dispatch({
          type: "ADD_MODAL",
          payload: [
            {
              data: users,
              id: user._id,
              title: user.name,
              type: "GET_ALL_USERS",
            },
          ],
        });
        // if (window.confirm("Are you sure you want to delete this account?")) {
        //   dispatch({ type: "NOTIFY", payload: { loading: true } });
        //   const res = await deleteData(`user/delete_user/${id}`, auth.token);
        //   dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        //   setCallback(!callback);
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!auth.user) return null;

  return (
    <div onClick={() => showModal && toggleModal()}>
      <BaseLayout>
        <Hero
          src={avatar ? avatar : auth.user.avatar}
          name={name}
          changeAvatar={changeAvatar}
        />
        <BasePage
          className="profile-page"
          header={`${(auth.user.role === "user"
            ? "User Profile"
            : auth.user.role === "admin"
            ? "Admin Profile"
            : "Root Profile"
          ).toUpperCase()} `}
          title={`PcHub ${name ? name : ""} Profile`}
        >
          <Modal
            dispatch={dispatch}
            showModal={showModal}
            toggleModal={toggleModal}
            state={state}
          />
          <section className="row text-secondary my-3">
            <div className="col-md-4">
              <h3 className="text-uppercase font-weight-bold">
                Edit Information
              </h3>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  className="form-control"
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={auth.user.email}
                  className="form-control"
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  placeholder="Your new password"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cf_password">Confirm New Password</label>
                <input
                  type="password"
                  name="cf_password"
                  value={cf_password}
                  className="form-control"
                  placeholder="Confirm new password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group text-center">
                <em style={{ color: "crimson" }}>
                  * If you update your password here, you will not be able to
                  login using google and facebook.
                </em>
              </div>

              <button
                className="btn btn-info"
                disabled={notify.loading}
                onClick={handleUpdateProfile}
              >
                Update
              </button>
            </div>
            <div className="col-md-8">
              {users.length > 0 && (
                <>
                  <h3
                    className="text-uppercase font-weight-bold"
                    style={{ marginTop: "30px" }}
                  >
                    Users
                  </h3>
                  <div className="my-3 table-responsive">
                    <table className="customers">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Admin</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.length > 0 &&
                          users.map((user) => (
                            <tr key={user._id} className="xyzz">
                              <td className="xyzz">
                                {auth.user.id !== user._id ? (
                                  <Link
                                    // Bug
                                    href={
                                      auth.user.id &&
                                      auth.user.email &&
                                      user.email &&
                                      user._id &&
                                      auth.user.email !== user.email
                                        ? `/user/profile/edit_user/${user._id}`
                                        : "#!"
                                    }
                                  >
                                    <a className="anchor-custom">
                                      {user._id
                                        .toString()
                                        .split("")
                                        .slice(0, 7)}
                                      ...
                                    </a>
                                  </Link>
                                ) : (
                                  user._id.toString().split("").slice(0, 7)
                                )}
                              </td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>
                                {user.role === "admin" ? (
                                  <i
                                    className="ri-check-double-fill"
                                    title="Admin"
                                    style={{ cursor: "default" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="ri-close-fill"
                                    title="User"
                                    style={{ cursor: "default" }}
                                  ></i>
                                )}
                              </td>
                              {auth.user.id !== user._id ? (
                                <td>
                                  <i
                                    className="ri-delete-bin-line"
                                    title="Remove"
                                    onClick={() => handleDelete(user)}
                                  ></i>
                                </td>
                              ) : (
                                <td></td>
                              )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              {orders.length > 0 && (
                <>
                  <h3
                    className="text-uppercase font-weight-bold"
                    style={{ marginTop: "30px" }}
                  >
                    Orders
                  </h3>
                  <div className="my-3 table-responsive">
                    <table className="customers">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Delivered</th>
                          <th>Paid</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders &&
                          orders.map((order) => (
                            <tr key={order._id}>
                              <td>
                                <Link href={`/order/${order._id}`}>
                                  <a className="anchor-custom">
                                    {order._id.toString().split("").slice(0, 7)}
                                    ...
                                  </a>
                                </Link>
                              </td>
                              <td>{formatDate(order.createdAt)}</td>
                              <td>{order.total}</td>
                              <td>
                                {order.delivered ? (
                                  <i
                                    className="ri-check-double-fill text-success"
                                    style={{ cursor: "default" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="ri-close-fill text-danger"
                                    style={{ cursor: "default" }}
                                  ></i>
                                )}
                              </td>
                              <td>
                                {order.paid ? (
                                  <i
                                    className="ri-check-double-fill text-success"
                                    style={{ cursor: "default" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="ri-close-fill text-danger"
                                    style={{ cursor: "default" }}
                                  ></i>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              {contacts.length > 0 && (
                <>
                  <h3
                    className="text-uppercase font-weight-bold"
                    style={{ marginTop: "30px" }}
                  >
                    Customers Message
                  </h3>
                  <div className="my-3 table-responsive">
                    <table className="customers">
                      <thead>
                        <tr>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>PHONE NO.</th>
                          <th>MESSAGE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts &&
                          contacts.map((contact) => (
                            <tr key={contact._id}>
                              <td>
                                <Link href={`/contact/${contact._id}`}>
                                  <a className="anchor-custom">
                                    {contact.name}
                                  </a>
                                </Link>
                              </td>
                              <td>{contact.email}</td>
                              <td>{contact.phone_no}</td>
                              <td>
                                {contact.message
                                  .split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                                ...
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </section>
        </BasePage>
      </BaseLayout>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  // some auth logic here
  const { res } = ctx;
  const { user } = parseCookies(ctx);
  const isAuth = user ? true : false;
  if (!isAuth) {
    withAuth(res, "/");
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Profile;
