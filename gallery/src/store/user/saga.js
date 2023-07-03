import { call, put, takeLatest } from "redux-saga/effects";
import { userService } from "../../service/AuthService";

import {
  performUserLogOut,
  performUserLogin,
  performUserRegister,
  setUser,
  userRequestError,
} from "./slice";

function* loginHandler(action) {
  try {
    yield put(userRequestError(null));
    const { email, password, onSuccess } = action.payload;
    const { data } = yield call(userService.loginUser, email, password);
    onSuccess();
    const userData = data.user;
    localStorage.setItem("access_token", data.authorisation.token);

    yield put(setUser(userData));
  } catch (error) {
    yield put(userRequestError(error.response.data.message));
  }
}
function* registerHandler(action) {
  try {
    yield put(userRequestError(null));
    const {
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      onSuccess,
    } = action.payload;
    const { data } = yield call(
      userService.registerUser,
      first_name,
      last_name,
      email,
      password,
      password_confirmation
    );
    localStorage.setItem("access_token", data.authorisation.token);
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    yield put(userRequestError(error.response.data.message));
  }
}

function* logoutHandler() {
  try {
    yield put(userRequestError(null));

    localStorage.removeItem("access_token");
    yield put(setUser(null));
  } catch (error) {
    yield put(userRequestError(error.response.data.message));
  }
}

export function* watchUsers() {
  yield takeLatest(performUserLogin.type, loginHandler);
  yield takeLatest(performUserRegister.type, registerHandler);
  yield takeLatest(performUserLogOut.type, logoutHandler);
}
