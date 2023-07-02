import { API } from "../shared/api";

export const galleryService = {
  getGalleries: async (payload) => {
    if (!payload?.page) {
      const data = await API.get("/");
      return data;
    } else {
      const data = await API.get(
        `?page=${payload.page}&searchTerm=${payload.searchTerm}`
      );
      return data;
    }
  },
  createGallery: async (name, description, image_urls) => {
    const data = API.post("/create", {
      name,
      description,
      image_urls,
    });
    return data;
  },
  getMyGalleries: async (payload) => {
    const searchTerm = payload?.searchTerm ?? "";
    const page = payload?.page ?? 1;
    const data = API.get(`/my-galleries?page=${page}&searchTerm=${searchTerm}`);
    return data;
  },
  getGalleryById: async (id) => {
    const data = API.get(`/galleries/${id}`);
    return data;
  },
  updateGalleryById: async (id, name, description, image_urls) => {
    const data = API.put(`/edit-gallery/${id}`, {
      id,
      name,
      description,
      image_urls,
    });
    return data;
  },
  deleteGallery: async (id) => {
    const data = API.delete(`${id}`);
    return data;
  },
  getUserWithGalleries: async (payload) => {
    const searchTerm = payload?.searchTerm ?? "";
    const page = payload?.page ?? 1;
    if (!payload?.page) {
      const data = await API.get(`/authors/${payload}`);
      return data;
    }
    const data = API.get(
      `/authors/${payload.id}/?page=${page}&searchTerm=${searchTerm}`
    );
    return data;
  },
};
