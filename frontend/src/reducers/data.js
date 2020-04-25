import { SESSION } from "../actions/types";

export default (state = {
  session: {}
}, action) => {
  switch(action.type) {
    case SESSION:
      return {
        ...state,
        session: action.data
      }
    default:
      return state;
  }
};