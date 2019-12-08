import ReactDOM from "react-dom";
import React from "react";
import App from "./components/app/app";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer";
import Operation from "./reducer/operation/operation";
import configureAPI from "./api";
import {compose} from "recompose";
import {Router} from "react-router-dom";
import history from "./history";
import Path from "./common/path";
import {ActionCreator} from "./reducer/app/reducer/reducer";

const init = () => {
  const api = configureAPI(
      () => history.push(Path.LOGIN),
      (error) => store.dispatch(ActionCreator.setError(error))
  );
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadOffers());
  store.dispatch(Operation.loadFavorites());

  ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
