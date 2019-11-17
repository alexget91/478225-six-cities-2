import {combineReducers} from "redux";
import {appReducer} from "./app-reducer/app-reducer";
import {userReducer} from "./user-reducer/user-reducer";

const reducer = combineReducers({
  appReducer,
  userReducer,
});

export default reducer;
