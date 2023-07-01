import { API } from "../shared/api";

export const galleryService = {
  getGalleries: async (page) => {
    if (!page) {
      const data = await API.get("/");
      return data;
    } else {
      const data = await API.get(`?page=${page}`);
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
  getMyGalleries: async () => {
    const data = API.get("/my-galleries");
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
};
