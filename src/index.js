import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app/app";
import offers from "./mocks/offers";

const init = (placeList) => {
  ReactDOM.render(
      <App offers={placeList}/>,
      document.querySelector(`#root`)
  );
};

init(offers);
