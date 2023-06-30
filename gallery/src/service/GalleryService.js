import { API } from "../shared/api";

export const getGallery = (id) => {
  return API.get(`/galleries/${id}`);
};

export const createGallery = (name, description, image_urls = []) => {
  return API.post("/create", { name, description, image_urls });
};

export const editGallery = (id, name, description, image_urls = []) => {
  return API.post(`/edit-galery/${id}`, { name, description, image_urls });
};

export const deleteGallery = (id) => {
  return API.delete(`${id}`);
};

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
  createGallery: async (name, description, image_urls, user_id) => {
    const data = API.post("/create", {
      name,
      description,
      image_urls,
      user_id,
    });
    return data;
  },
};
