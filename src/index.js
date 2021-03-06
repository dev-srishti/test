import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { initDB } from "react-indexed-db";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./rootReducer";
import DbConfig from "./config/DbConfig";

const initialState = {};
console.log(DbConfig);
initDB(DbConfig);
const store = createStore(rootReducer, initialState);
window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
