/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import UserExport from "./contexts/UserContext";
import App from "./App";
import "./Notif.css";

ReactDOM.render(
  <React.StrictMode>
    <UserExport.ContextProvider>
      <App />
      <ToastContainer className="toast-position" autoClose={1500} />
    </UserExport.ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
