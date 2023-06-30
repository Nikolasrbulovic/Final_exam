import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGalleries: () => {},
  performCreateGallery: () => {},
};
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    lastPage: 1,
    error: "",
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
  },
});

export const {
  performGetAllGalleries,
  setGalleries,
  setLastPage,
  performCreateGallery,
  setGalleryError,
} = gallerySlice.actions;

export default gallerySlice.reducer;
