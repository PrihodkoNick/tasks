import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { createStore } from "redux";

import rootReducer from "./reducers";

const store = createStore(rootReducer);

const update = () => {
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
};

update();

store.subscribe(update);
