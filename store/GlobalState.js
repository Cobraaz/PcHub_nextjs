import { createContext, useReducer, useEffect } from "react";
import Cookie from "js-cookie";
import { getData } from "../utils/fetchData";
import reducers from "./Reducers";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    users: [],
    cart: [],
    modal: {},
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

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
  }, []);

  useEffect(() => {
    const __next__cart01__cobraaz = JSON.parse(
      localStorage.getItem("__next__cart01__cobraaz")
    );

    if (__next__cart01__cobraaz)
      dispatch({ type: "ADD_CART", payload: __next__cart01__cobraaz });
  }, []);

  useEffect(() => {
    localStorage.setItem("__next__cart01__cobraaz", JSON.stringify(cart));
  }, [cart]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
