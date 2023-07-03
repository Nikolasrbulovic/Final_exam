export const selectAllGalleries = (state) => {
  return state.gallery.galleries;
};
export const selectLastPage = (state) => {
  return state.gallery.lastPage;
};
export const selectGalleryErrorMessage = (state) => {
  return state.gallery.error;
};
export const selectMyGalleries = (state) => {
  return state.gallery.myGalleries;
};
export const selectGalleryById = (state) => {
  return state.gallery.galleryById;
};

export const selectLoading = (state) => {
  return state.gallery.loading;
};
export const selectLastPageMyGallery = (state) => {
  return state.gallery.lastPageMyGallery;
};

export const selectUserGalleries = (state) => {
  return state.gallery.userGalleries;
};
export const selectLastPageAuthors = (state) => {
  return state.gallery.lastPageAuthors;
};
export const selectComments = (state) => {
  return state.gallery.comments;
};
