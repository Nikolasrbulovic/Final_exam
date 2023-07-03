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
  performDeleteComment: () => {},
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
    loading: false,
    userGalleries: [],
    comments: [],
  },
  reducers: {
    ...middlewareActions,
    setGalleries: (state, action) => {
      state.galleries.push(...action.payload);
    },
    deleteGallery: (state, action) => {
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
    setLoading: (state, action) => {
      state.loading = action.payload;
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
      console.log(action.payload, "yy");
      if (!state.myGalleries) {
        state.myGalleries = [...action.payload];
        return;
      }
      //state.myGalleries.push(...action.payload);
      state.myGalleries = [...action.payload, ...state.myGalleries];
    },
    updateMyGalleries: (state, action) => {
      state.myGalleries = state.myGalleries.map((gallery, index) => {
        if (gallery.id === action.payload.id) {
          return action.payload;
        } else {
          return gallery;
        }
      });
    },
    clearMyGalleries: (state) => {
      state.myGalleries = [];
    },
    setGalleryById: (state, action) => {
      state.galleryById = action.payload;
    },
    setUserGalleries: (state, action) => {
      if (!state.userGalleries) {
        state.userGalleries = [...action.payload];
        return;
      }
      state.userGalleries.push(...action.payload);
    },
    setComments: (state, action) => {
      console.log(action);
      state.galleryById.comments.push(action.payload);
    },
    clearComment: (state, action) => {
      const commentIdToRemove = action.payload;
      state.galleryById.comments = state.galleryById.comments.filter(
        (comment) => comment.id.toString() !== commentIdToRemove.toString()
      );
      console.log(state.galleryById.comments);
    },
  },
});

export const {
  performGetAllGalleries,
  performCreateGallery,
  performGetMyGalleries,
  performGetUserWithGalleries,
  performDeleteGallery,
  performDeleteComment,
  deleteGallery,
  perforomGetGalleryById,
  updateMyGalleries,
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
  setLoading,
  clearComment,
} = gallerySlice.actions;

export default gallerySlice.reducer;
