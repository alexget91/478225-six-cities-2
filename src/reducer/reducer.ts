import {combineReducers, Reducer} from "redux";
import {reducer as appReducer, State as AppState} from "./app/reducer/reducer";
import {reducer as dataReducer, State as DataState} from "./data/reducer/reducer";
import {reducer as userReducer, State as UserState} from "./user/reducer/reducer";
import NameSpace from "./name-space";

type GlobalState = {
  [namespace in NameSpace]?: AppState | DataState | UserState;
};

const reducer: Reducer = combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.DATA]: dataReducer,
  [NameSpace.USER]: userReducer,
});

export default reducer;
export {GlobalState};
