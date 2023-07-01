import { call, put, takeLatest } from "redux-saga/effects";
import { galleryService } from "../../service/GalleryService";
import {
  performCreateGallery,
  performGetMyGalleries,
  perforomGetGalleryById,
  setGalleries,
  setGalleryById,
  setGalleryError,
  perforomUpdateGallery,
  setLastPage,
  setMyGalleries,
} from "./slice";
import { performGetAllGalleries } from "./slice";
function* getAllgalleries({ payload }) {
  try {
    const { data } = yield call(galleryService.getGalleries, payload);

    let galleries = data.data;

    let lastPage = data.last_page;

    yield put(setLastPage(lastPage));
    yield put(setGalleries(galleries));
  } catch (error) {
    console.log(error);
  }
}
function* createGallery(action) {
  try {
    const { name, description, image_urls } = action.payload;

    yield call(galleryService.createGallery, name, description, image_urls);
  } catch (error) {
    console.log(error.response.statusText);
    yield put(setGalleryError(error.response.statusText));
  }
}
function* updateGallery(action) {
  try {
    const { id, name, description, image_urls } = action.payload;

    yield call(
      galleryService.updateGalleryById,
      id,
      name,
      description,
      image_urls
    );
  } catch (error) {
    console.log(error.response.statusText);
    yield put(setGalleryError(error.response.statusText));
  }
}
function* getMyGalleries() {
  try {
    const { data } = yield call(galleryService.getMyGalleries);

    yield put(setMyGalleries(data.data));
  } catch (error) {
    console.log(error);
  }
}
function* getGalleryById(action) {
  try {
    const { data } = yield call(galleryService.getGalleryById, action.payload);

    yield put(setGalleryById(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchGalleries() {
  yield takeLatest(performGetAllGalleries.type, getAllgalleries);
  yield takeLatest(performCreateGallery.type, createGallery);
  yield takeLatest(performGetMyGalleries.type, getMyGalleries);
  yield takeLatest(perforomGetGalleryById.type, getGalleryById);
  yield takeLatest(perforomUpdateGallery.type, updateGallery);
}
