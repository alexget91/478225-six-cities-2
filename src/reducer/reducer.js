import {combineReducers} from "redux";
import {reducer as appReducer} from "./app/reducer/reducer";
import {reducer as userReducer} from "./user/reducer/reducer";

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
});

export default reducer;
