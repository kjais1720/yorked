import {USER_TOKEN, USER_INFO, authDispatchConstants} from "utilities";
const {LOGIN, LOGOUT} = authDispatchConstants;
/**
 *
 * @param {object} state : the auth state containing properties of the user
 * @param {object} action : Containing type & payload properties
 * @returns {object} state : modified state
 */
export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: { ...payload } };
    case LOGOUT:
      localStorage.removeItem(USER_TOKEN);
      localStorage.removeItem(USER_INFO);
      return { ...state, isLoggedIn: false, user: {} };
    default:
      return state;
  }
};
