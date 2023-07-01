import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGalleries: () => {},
  performCreateGallery: () => {},
  performGetMyGalleries: () => {},
  perforomGetGalleryById: () => {},
  perforomUpdateGallery: () => {},
};
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    lastPage: 1,
    error: "",
    myGalleries: [],
    galleryById: {},
  },
  reducers: {
    ...middlewareActions,
    setGalleries: (state, action) => {
      state.galleries.push(...action.payload);
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setGalleryError: (state, action) => {
      state.error = action.payload;
    },
    setMyGalleries: (state, action) => {
      state.myGalleries.push(...action.payload);
    },
    setGalleryById: (state, action) => {
      state.galleryById = action.payload;
    },
  },
});

export const {
  performGetAllGalleries,
  setGalleries,
  setLastPage,
  performCreateGallery,
  setGalleryError,
  setMyGalleries,
  performGetMyGalleries,
  perforomGetGalleryById,
  perforomUpdateGallery,
  setGalleryById,
} = gallerySlice.actions;

export default gallerySlice.reducer;
