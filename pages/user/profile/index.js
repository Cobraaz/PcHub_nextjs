import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { parseCookies } from "nookies";
import imageCompression from "browser-image-compression";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { DataContext } from "store/GlobalState";
import valid from "utils/valid";
import { deleteData, getData, patchData } from "utils/fetchData";
import { withAuth } from "utils/auth";
import Link from "next/link";

const Profile = () => {
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
  const { auth, notify, users } = state;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

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
          payload: res,
        });
      });
    }
  }, [auth.token, auth.user, callback]);

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

  const handleDelete = async (id) => {
    try {
      if (auth.user.id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          dispatch({ type: "NOTIFY", payload: { loading: true } });
          const res = await deleteData(`user/delete_user/${id}`, auth.token);
          dispatch({ type: "NOTIFY", payload: { success: res.msg } });
          setCallback(!callback);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!auth.user) return null;

  return (
    <BaseLayout>
      <BasePage
        className="profile-page"
        header={`${(auth.user.role === "user"
          ? "User Profile"
          : auth.user.role === "admin"
          ? "Admin Profile"
          : "Root Profile"
        ).toUpperCase()} `}
      >
        <section className="row text-secondary my-3">
          <div className="col-md-4">
            <div className="avatar">
              <Image
                src={avatar ? avatar : auth.user.avatar}
                alt="avatar"
                layout="fill"
                quality={25}
              />
              <span>
                <i className="fas fa-camera"></i>
                <p>Change</p>
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  onChange={changeAvatar}
                />
              </span>
            </div>

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
                <h3 className="text-uppercase">Users</h3>
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
                        users.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              {user.role === "admin" ? (
                                <i
                                  className="ri-check-double-fill"
                                  title="Admin"
                                ></i>
                              ) : (
                                <i className="ri-close-fill" title="User"></i>
                              )}
                            </td>
                            {auth.user.id !== user._id && (
                              <td>
                                <Link
                                  // to={`/edit_user/${user._id}`}
                                  href={`/user/profile/edit_user/${user._id}`}
                                >
                                  <i
                                    className="ri-pencil-fill"
                                    title="Edit"
                                  ></i>
                                </Link>
                                <i
                                  className="ri-delete-bin-line"
                                  title="Remove"
                                  onClick={() => handleDelete(user._id)}
                                ></i>
                              </td>
                            )}
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
