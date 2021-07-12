import resultReducer from "./result.reducer";
import loadingReducer from "./loading.reducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  result: resultReducer,
  loading: loadingReducer,
});

export default allReducers;
