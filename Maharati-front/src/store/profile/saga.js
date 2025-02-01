import { takeEvery, put, call } from "redux-saga/effects";

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes";
import { profileSuccess, profileError } from "./actions";
import { editProfile } from "../../helpers/profile_helper";

function* updateProfile({ payload: { user, token } }) {
  try {
    const response = yield call(editProfile, user, token);
    yield put(profileSuccess(response));
  } catch (error) {
    yield put(profileError(error));
  }
}

function* ProfileSaga() {
  yield takeEvery(EDIT_PROFILE, updateProfile);
}

export default ProfileSaga;
