import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGalleries: () => {},
  performCreateGallery: () => {},
  performGetMyGalleries: () => {},
  perforomGetGalleryById: () => {},
  perforomUpdateGallery: () => {},
  performDeleteGallery: () => {},
  performGetUserWithGalleries: () => {},
  performCreateComment: () => {},
};
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    lastPage: 1,
    lastPageMyGallery: 1,
    lastPageAuthors: 1,
    error: "",
    myGalleries: null,
    galleryById: {},
    loadingGalleryById: false,
    userGalleries: [],
    comments: [],
  },
  reducers: {
    ...middlewareActions,
    setGalleries: (state, action) => {
      state.galleries.push(...action.payload);
    },
    deleteGallery: (state, action) => {
      console.log(action.payload, "xx");
      state.galleries = state.galleries.filter(
        (gallery) => gallery.id.toString() !== action.payload.toString()
      );
      state.myGalleries = state.myGalleries.filter(
        (gallery) => gallery.id.toString() !== action.payload.toString()
      );
    },
    clearGalleries: (state) => {
      state.galleries = [];
    },
    clearUserGalleries: (state) => {
      state.userGalleries = [];
    },
    setLoadingGalleryById: (state, action) => {
      state.loadingGalleryById = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setLastPageMyGallery: (state, action) => {
      state.lastPageMyGallery = action.payload;
    },
    setLastPageAuthors: (state, action) => {
      state.lastPageAuthors = action.payload;
    },
    setGalleryError: (state, action) => {
      state.error = action.payload;
    },
    setMyGalleries: (state, action) => {
      if (!state.myGalleries) {
        state.myGalleries = [...action.payload];
        return;
      }
      state.myGalleries.push(...action.payload);
    },
    clearMyGalleries: (state) => {
      state.myGalleries = [];
    },
    setGalleryById: (state, action) => {
      state.galleryById = action.payload;
    },
    setUserGalleries: (state, action) => {
      state.userGalleries.push(...action.payload);
    },
    setComments: (state, action) => {
      state.galleryById.comments.push(action.payload);
      // state.comments.push(action.payload);
    },
    clearComments: (state, action) => {
      state.comments = [];
    },
  },
});

export const {
  performGetAllGalleries,
  performCreateGallery,
  performGetMyGalleries,
  performGetUserWithGalleries,
  performDeleteGallery,
  deleteGallery,
  perforomGetGalleryById,
  perforomUpdateGallery,
  performCreateComment,
  setUserGalleries,
  setLastPageAuthors,
  setGalleries,
  clearUserGalleries,
  clearGalleries,
  setLastPage,
  setGalleryError,
  setComments,
  setMyGalleries,
  setLastPageMyGallery,
  clearMyGalleries,
  setGalleryById,
  setLoadingGalleryById,
  clearComments,
} = gallerySlice.actions;

export default gallerySlice.reducer;
