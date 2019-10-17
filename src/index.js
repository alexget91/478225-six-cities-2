import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app/app";

const init = () => {
  ReactDOM.render(
      <App/>,
      document.querySelector(`#root`)
  );
};

init();
