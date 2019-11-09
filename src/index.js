import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app/app";
import offers from "./mocks/offers";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "./reducer";

const getCitiesList = (placeList) => Object.keys(
    placeList.reduce((result, offer) => {
      result[offer.city.name] = true;
      return result;
    }, {})
);

const init = (placeList) => {
  ReactDOM.render(
      <Provider store={createStore(reducer)}>
        <App cities={getCitiesList(placeList)} allOffers={placeList}/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(offers);
