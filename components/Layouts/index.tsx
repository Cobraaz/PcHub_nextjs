import Notify from "components/Shared/Notify";
import { useContext, useEffect } from "react";
import { DataContext } from "store/GlobalState";
import { ToastContainer } from "react-toastify";
import Cookie from "js-cookie";
import { getData } from "utils/fetchData";

export type children = {
  children: React.ReactNode;
};
export type auth = {
  token: string;
};

const Layout = ({ children }: children) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/access_token").then((res) => {
        if (res.err) {
          Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
          Cookie.remove("user");
          return localStorage.removeItem("firstLogin");
        }
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }
    getData("categories").then((res) => {
      if (res.err) {
        return dispatch({
          type: "NOTIFY",
          payload: { error: res.err },
        });
      }
      dispatch({
        type: "ADD_CATEGORIES",
        payload: res.categories,
      });
    });
    getData("brand").then((res) => {
      if (res.err) {
        return dispatch({
          type: "NOTIFY",
          payload: { error: res.err },
        });
      }
      dispatch({
        type: "ADD_BRANDS",
        payload: res.brands,
      });
    });
  }, []);

  useEffect(() => {
    const __next__cart01__cobraaz = JSON.parse(
      localStorage.getItem("__next__cart01__cobraaz")!
    );

    if (__next__cart01__cobraaz)
      dispatch({ type: "ADD_CART", payload: __next__cart01__cobraaz });
  }, []);

  useEffect(() => {
    localStorage.setItem("__next__cart01__cobraaz", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err)
          return dispatch({
            type: "NOTIFY",
            payload: { error: res.err },
          });

        dispatch({ type: "ADD_ORDERS", payload: res.orders });
      });

      if (auth.user!.role === "root") {
        getData("user/all_infor", auth.token).then((res) => {
          if (res.err)
            return dispatch({
              type: "NOTIFY",
              payload: { error: res.err },
            });
          dispatch({
            type: "GET_ALL_USERS",
            payload: res.users,
          });
        });
      }
    } else {
      dispatch({ type: "ADD_ORDERS", payload: [] });
      dispatch({ type: "GET_ALL_USERS", payload: [] });
    }
  }, [auth.token]);

  return (
    <>
      <Notify />

      <main>{children}</main>
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default Layout;
