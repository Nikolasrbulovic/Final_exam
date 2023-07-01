import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGalleries: () => {},
  performCreateGallery: () => {},
  performGetMyGalleries: () => {},
  perforomGetGalleryById: () => {},
  perforomUpdateGallery: () => {},
  performDeleteGallery: () => {},
};
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    lastPage: 1,
    lastPageMyGallery: 1,
    error: "",
    myGalleries: [],
    galleryById: {},
    loadingGalleryById: false,
  },
  reducers: {
    ...middlewareActions,
    setGalleries: (state, action) => {
      state.galleries.push(...action.payload);
    },
    clearGalleries: (state) => {
      state.galleries = [];
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
  },
});

export const {
  performGetAllGalleries,
  setGalleries,
  clearGalleries,
  setLastPage,
  performCreateGallery,
  setGalleryError,
  setMyGalleries,
  performGetMyGalleries,
  performDeleteGallery,
  setLastPageMyGallery,
  clearMyGalleries,
  perforomGetGalleryById,
  perforomUpdateGallery,
  setGalleryById,
  setLoadingGalleryById,
} = gallerySlice.actions;

export default gallerySlice.reducer;
