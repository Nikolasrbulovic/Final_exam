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
  performDeleteComment,
  setGalleries,
  setGalleryById,
  setGalleryError,
  perforomUpdateGallery,
  setLastPage,
  setMyGalleries,
  updateMyGalleries,
  setLoading,
  clearUserGalleries,
  clearGalleries,
  clearMyGalleries,
  setLastPageAuthors,
  setUserGalleries,
  setComments,
  clearComment,
  deleteGallery,
} from "./slice";
import { performGetAllGalleries } from "./slice";

function* getAllgalleries({ payload }) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(galleryService.getGalleries, payload);

    let galleries = data.data;

    let lastPage = data.last_page;
    if (payload?.shouldClearGalleries) {
      yield put(clearGalleries(galleries));
    }
    yield put(setLastPage(lastPage));
    yield put(setGalleries(galleries));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
    console.log(error);
  }
}
function* createGallery(action) {
  try {
    const { name, description, image_urls, onSuccess } = action.payload;

    const { data } = yield call(
      galleryService.createGallery,
      name,
      description,
      image_urls
    );
    console.log(data, "xx");
    yield put(setMyGalleries([data.gallery]));
    onSuccess();
  } catch (error) {
    console.log(error.response.statusText);
    yield put(setGalleryError(error.response.statusText));
  }
}
function* updateGallery(action) {
  try {
    const { id, name, description, image_urls, onSuccess } = action.payload;

    const { data } = yield call(
      galleryService.updateGalleryById,
      id,
      name,
      description,
      image_urls
    );

    yield put(updateMyGalleries(data));
    onSuccess();
  } catch (error) {
    console.log(error.response.statusText);
    yield put(setGalleryError(error.response.statusText));
  }
}
function* getMyGalleries(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(galleryService.getMyGalleries, action.payload);

    if (action.payload?.shouldClearGalleries) {
      yield put(clearMyGalleries(data.data));
    }
    yield put(setLastPageMyGallery(data.last_page));
    yield put(setMyGalleries(data.data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
    console.log(error);
  }
}
function* getGalleryById(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(galleryService.getGalleryById, action.payload);
    yield put(setGalleryById(data));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));

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
    yield put(setLoading(true));
    console.log(action);
    const { data } = yield call(
      galleryService.getUserWithGalleries,
      action.payload
    );
    console.log(data);
    if (action.payload?.shouldClearGalleries) {
      yield put(clearUserGalleries(data.data));
    }
    yield put(setLastPageAuthors(data.last_page));
    yield put(setUserGalleries(data.data));
    yield put(setLoading(false));
    return data;
  } catch (error) {
    yield put(setLoading(false));
    console.log(error);
  }
}
function* createComment(action) {
  try {
    //yield put(clearComments());
    const { data } = yield call(galleryService.createComment, action.payload);

    if (data) {
      yield put(setComments(data.comment));
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
function* deleteComment(action) {
  try {
    const { data } = yield call(galleryService.deleteComment, action.payload);
    yield put(clearComment(action.payload));
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
  yield takeLatest(performDeleteComment.type, deleteComment);
}
