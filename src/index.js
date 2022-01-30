import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { CharContextProvider } from "./Store/char-context";
import { InvContextProvider } from "./Store/inv-context";

ReactDOM.render(
  <CharContextProvider>
    <InvContextProvider>
      <App />
      {/* <BrowserRouter /> */}
    </InvContextProvider>
  </CharContextProvider>,
  document.getElementById("root")
);
