import { call, put, takeLatest } from "redux-saga/effects";
import { galleryService } from "../../service/GalleryService";
import {
  performCreateGallery,
  performGetMyGalleries,
  performGetUserWithGalleries,
  performDeleteGallery,
  setLastPageMyGallery,
  perforomGetGalleryById,
  performCreateComment,
  setGalleries,
  setGalleryById,
  setGalleryError,
  perforomUpdateGallery,
  setLastPage,
  setMyGalleries,
  setLoadingGalleryById,
  clearUserGalleries,
  clearGalleries,
  clearMyGalleries,
  setLastPageAuthors,
  setUserGalleries,
  setComments,
  clearComments,
  deleteGallery,
} from "./slice";
import { performGetAllGalleries } from "./slice";

function* getAllgalleries({ payload }) {
  try {
    console.log(payload, "xx");
    const { data } = yield call(galleryService.getGalleries, payload);

    let galleries = data.data;

    let lastPage = data.last_page;
    if (payload?.shouldClearGalleries) {
      yield put(clearGalleries(galleries));
    }
    yield put(setLastPage(lastPage));
    yield put(setGalleries(galleries));
  } catch (error) {
    console.log(error);
  }
}
function* createGallery(action) {
  try {
    const { name, description, image_urls, onSuccess } = action.payload;

    yield call(galleryService.createGallery, name, description, image_urls);
    onSuccess();
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
function* getMyGalleries(action) {
  try {
    console.log(action, "asdad");
    const { data } = yield call(galleryService.getMyGalleries, action.payload);
    console.log(data);
    if (action.payload?.shouldClearGalleries) {
      yield put(clearMyGalleries(data.data));
    }
    yield put(setLastPageMyGallery(data.last_page));
    yield put(setMyGalleries(data.data));
  } catch (error) {
    console.log(error);
  }
}
function* getGalleryById(action) {
  try {
    yield put(setLoadingGalleryById(true));
    const { data } = yield call(galleryService.getGalleryById, action.payload);
    yield put(setGalleryById(data));
    yield put(setLoadingGalleryById(false));
  } catch (error) {
    yield put(setLoadingGalleryById(false));

    console.log(error);
  }
}
function* deleteGalleryById(action) {
  try {
    const { onSuccess } = action.payload;
    const { data } = yield call(
      galleryService.deleteGallery,
      action.payload.id
    );
    yield put(deleteGallery(action.payload.id));
    onSuccess();

    return data;
  } catch (error) {
    console.log(error);
  }
}
function* getUserGalleries(action) {
  try {
    console.log(action);
    const { data } = yield call(
      galleryService.getUserWithGalleries,
      action.payload
    );
    if (action.payload?.shouldClearGalleries) {
      yield put(clearUserGalleries(data.data));
    }
    yield put(setLastPageAuthors(data.last_page));
    yield put(setUserGalleries(data.data));
    return data;
  } catch (error) {
    console.log(error);
  }
}
function* createComment(action) {
  try {
    yield put(clearComments());
    const { data } = yield call(galleryService.createComment, action.payload);

    if (data) {
      yield put(setComments(data.comment));
    }
    return data;
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
  yield takeLatest(performDeleteGallery.type, deleteGalleryById);
  yield takeLatest(performGetUserWithGalleries.type, getUserGalleries);
  yield takeLatest(performCreateComment.type, createComment);
}
