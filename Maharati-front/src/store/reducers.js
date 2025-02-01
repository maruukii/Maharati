import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Calendar
import calendar from "./calendar/reducer";

// Profile

import profile from "./profile/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  calendar,
  profile,
});

export default rootReducer;
