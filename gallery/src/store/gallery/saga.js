import { call, put, takeLatest } from "redux-saga/effects";
import { galleryService } from "../../service/GalleryService";
import { setGalleries, setLastPage } from "./slice";
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

export function* watchGalleries() {
  yield takeLatest(performGetAllGalleries.type, getAllgalleries);
}
