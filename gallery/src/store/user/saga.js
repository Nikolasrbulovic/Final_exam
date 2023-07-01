import { call, put, takeLatest } from "redux-saga/effects";
import { userService } from "../../service/AuthService";

import {
  performUserLogOut,
  performUserLogin,
  performUserRegister,
  setUser,
  userRegisterFailure,
} from "./slice";

function* loginHandler(action) {
  try {
    const { email, password, onSuccess } = action.payload;
    const { data } = yield call(userService.loginUser, email, password);
    onSuccess();
    const userData = data.user;
    localStorage.setItem("access_token", data.authorisation.token);

    yield put(setUser(userData));
  } catch (error) {
    console.log(error);
  }
}
function* registerHandler(action) {
  try {
    const { first_name, last_name, email, password, password_confirmation } =
      action.payload;
    const { data } = yield call(
      userService.registerUser,
      first_name,
      last_name,
      email,
      password,
      password_confirmation
    );
    localStorage.setItem("access_token", data.authorisation.token);
  } catch (error) {
    yield put(userRegisterFailure(error.response.data.message));
  }
}

function* logoutHandler() {
  try {
    //yield call(userService.logoutUser);
    localStorage.removeItem("access_token");
    yield put(setUser(null));
  } catch (error) {
    console.log(error);
  }
}

export function* watchUsers() {
  yield takeLatest(performUserLogin.type, loginHandler);
  yield takeLatest(performUserRegister.type, registerHandler);
  yield takeLatest(performUserLogOut.type, logoutHandler);
}
