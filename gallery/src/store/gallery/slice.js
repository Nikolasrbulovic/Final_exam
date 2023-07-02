import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGalleries: () => {},
  performCreateGallery: () => {},
  performGetMyGalleries: () => {},
  perforomGetGalleryById: () => {},
  perforomUpdateGallery: () => {},
  performDeleteGallery: () => {},
  performGetUserWithGalleries: () => {},
};
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    lastPage: 1,
    lastPageMyGallery: 1,
    lastPageAuthors: 1,
    error: "",
    myGalleries: [],
    galleryById: {},
    loadingGalleryById: false,
    userGalleries: [],
  },
  reducers: {
    ...middlewareActions,
    setGalleries: (state, action) => {
      state.galleries.push(...action.payload);
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
  },
});

export const {
  performGetAllGalleries,
  performCreateGallery,
  performGetMyGalleries,
  performGetUserWithGalleries,
  performDeleteGallery,
  perforomGetGalleryById,
  perforomUpdateGallery,
  setUserGalleries,
  setLastPageAuthors,
  setGalleries,
  clearUserGalleries,
  clearGalleries,
  setLastPage,
  setGalleryError,
  setMyGalleries,
  setLastPageMyGallery,
  clearMyGalleries,
  setGalleryById,
  setLoadingGalleryById,
} = gallerySlice.actions;

export default gallerySlice.reducer;
