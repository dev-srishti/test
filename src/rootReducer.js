import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

const commonReducers = {
  form: formReducer,
};

export default combineReducers(commonReducers);
