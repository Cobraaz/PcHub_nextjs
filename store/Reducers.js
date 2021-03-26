import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };

    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ACTIONS.ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

export default reducers;
