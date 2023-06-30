import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";
import userReducer from "./user/slice";
import galleryReducer from "./gallery/slice";
const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    users: userReducer,
    gallery: galleryReducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});
for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
