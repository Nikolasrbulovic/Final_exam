export const selectAllGalleries = (state) => {
  return state.gallery.galleries;
};
export const selectLastPage = (state) => {
  return state.gallery.lastPage;
};
export const selectGalleryErrorMessage = (state) => {
  return state.gallery.error;
};