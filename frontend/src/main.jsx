/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import UserExport from "./contexts/UserContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <UserExport.ContextProvider>
      <App />
      <ToastContainer autoClose={1000} />
    </UserExport.ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
