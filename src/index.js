import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { CharContextProvider } from "./Store/char-context";

ReactDOM.render(
  <CharContextProvider>
    <App />
    {/* <BrowserRouter /> */}
  </CharContextProvider>,
  document.getElementById("root")
);
