import { call, put, takeLatest } from "redux-saga/effects";
import { galleryService } from "../../service/GalleryService";
import {
  performCreateGallery,
  setGalleries,
  setGalleryError,
  setLastPage,
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
    const { name, description, image_urls, user_id } = action.payload;

    yield call(
      galleryService.createGallery,
      name,
      description,
      image_urls,
      user_id
    );
  } catch (error) {
    console.log(error.response.statusText);
    yield put(setGalleryError(error.response.statusText));
  }
}

export function* watchGalleries() {
  yield takeLatest(performGetAllGalleries.type, getAllgalleries);
  yield takeLatest(performCreateGallery.type, createGallery);
}
