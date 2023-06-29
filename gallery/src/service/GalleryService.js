import { API } from "../shared/api";

export const getGalleries = () => {
  return API.get("/");
};

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
