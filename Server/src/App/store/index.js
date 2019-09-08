import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { createBrowserHistory } from 'history'
import { initalAppState } from "../reducers/initial-state";

export const history = createBrowserHistory({
  getUserConfirmation(message, callback) {
    const result = window.confirm(message);
    callback(result);
  }
});

export const store = createStore(
  reducer,
  initalAppState,
  composeWithDevTools(applyMiddleware(thunk))
);
