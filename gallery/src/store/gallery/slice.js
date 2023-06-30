import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGetAllGalleries: () => {},
};
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    lastPage: 1,
  },
  reducers: {
    ...middlewareActions,
    setGalleries: (state, action) => {
      state.galleries.push(...action.payload);
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
  },
});

export const { performGetAllGalleries, setGalleries, setLastPage } =
  gallerySlice.actions;

export default gallerySlice.reducer;
