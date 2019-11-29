import {combineReducers} from "redux";
import {reducer as appReducer} from "./app/reducer/reducer";
import {reducer as userReducer} from "./user/reducer/reducer";
import NameSpace from "./name-space";

const reducer = combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.USER]: userReducer,
});

export default reducer;
