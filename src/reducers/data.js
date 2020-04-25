import {FETCH_TODOS} from '../actions/types';
export default (state = {
  session: {}
}, action) => {
  switch(action.type) {
    case SESSION:
      return {
        ...state,
        session: action.data
      }
    case FETCH_TODOS:
      return action.payload;
    default:
      return state;
  }
};