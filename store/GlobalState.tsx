import React, {
  createContext,
  useReducer,
  useEffect,
  Dispatch,
  useContext,
} from "react";
import Cookie from "js-cookie";
import { getData } from "../utils/fetchData";
import reducers from "./Reducers";
import { IContextProps, children, Actions } from "./globalStore.model";

export const DataContext = createContext({} as IContextProps);

export interface IContext {
  dispatch: Dispatch<Actions>;
}

export const DataProvider: React.FC = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    users: [],
    cart: [],
    modal: [],
    orders: [],
    categories: [],
    brands: [],
    contacts: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
