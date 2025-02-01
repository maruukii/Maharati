import { all, fork } from "redux-saga/effects";

import LayoutSaga from "./layout/saga";
import calendarSaga from "./calendar/saga";
import ProfileSaga from "./profile/saga";

export default function* rootSaga() {
  yield all([fork(LayoutSaga), fork(calendarSaga), fork(ProfileSaga)]);
}
