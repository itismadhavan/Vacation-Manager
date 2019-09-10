import { initalAppState } from "./initial-state";
import * as actionTypes from "../actions/actionTypes"

const reducers = (state = initalAppState, action) => {
  switch (action.type) {
    case actionTypes.USER_DETAIL: {
      return { ...state.user, name: action.user.name, photo: action.user.photo, showUser: true }
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducers;
