import * as ReactDOM from "react-dom";
import * as React from "react";
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
import {ActionCreator as AppActionCreator} from "./reducer/app/reducer/reducer";
import {ActionCreator as UserActionCreator} from "./reducer/user/reducer/reducer";

const init = () => {
  const api = configureAPI(
    () => {
      store.dispatch(UserActionCreator.setAuthorizationRequired(true));
    },
    (error) => store.dispatch(AppActionCreator.setError(error))
  );
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
  );

  store.dispatch(Operation.getUser());

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
