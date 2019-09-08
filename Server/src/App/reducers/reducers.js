import { initalAppState } from "./initial-state";
import * as actionTypes from "../actions/actionTypes"

const reducers = (state = initalAppState, action) => {
  switch (action.type) {
    case "FETCH_STOCKS": {
      return {
        ...state
      };
    }
    case actionTypes.LOAD_STOCK_SEARCH_SUCCESS: {
      return action.stockResults;
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducers;
