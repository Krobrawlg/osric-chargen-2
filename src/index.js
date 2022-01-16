import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CharContextProvider } from "./Store/char-context";

ReactDOM.render(
  <CharContextProvider>
    <App />
  </CharContextProvider>,
  document.getElementById("root")
);
