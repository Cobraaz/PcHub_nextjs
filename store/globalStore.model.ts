import { Dispatch } from "react";

export interface IState {
  notify: {};
  auth: {
    token?: string;
    user?: {
      role?: "user" | "admin" | "root";
    };
  };
  users: [];
  cart: [];
  modal: [];
  orders: [];
  categories: [];
  brands: [];
  contacts: [];
}

interface INOTIFY {
  type: "NOTIFY";
  payload?: {};
}

interface IAUTH {
  type: "AUTH";
  token?: string;
  payload?: {
    token: string;
    user: string;
  };
}
interface IGET_ALL_USERS {
  type: "GET_ALL_USERS";
  payload?: {};
}

interface IADD_CART {
  type: "ADD_CART";
  payload?: {} | any;
}
interface IADD_MODAL {
  type: "ADD_MODAL";
  payload?: {};
}
interface IADD_ORDERS {
  type: "ADD_ORDERS";
  payload?: {};
}

interface IADD_CATEGORIES {
  type: "ADD_CATEGORIES";
  payload?: {};
}
interface IDELETE_PRODUCT {
  type: "DELETE_PRODUCT";
  payload?: {};
}

interface IADD_BRANDS {
  type: "ADD_BRANDS";
  payload?: {};
}
interface IALL_CONTACT_US {
  type: "ALL_CONTACT_US";
  payload?: {};
}

export type Actions =
  | INOTIFY
  | IAUTH
  | IGET_ALL_USERS
  | IADD_CART
  | IADD_MODAL
  | IADD_ORDERS
  | IADD_CATEGORIES
  | IDELETE_PRODUCT
  | IADD_BRANDS
  | IALL_CONTACT_US;

export interface IContextProps {
  state: IState;
  dispatch: Dispatch<Actions>;
}

export type children = {
  children: React.ReactNode;
};
