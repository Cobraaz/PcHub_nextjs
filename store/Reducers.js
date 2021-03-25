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
    case ACTIONS.BG_HEADER:
      return {
        ...state,
        bg_header: action.payload,
      };

    default:
      return state;
  }
};

export default reducers;
