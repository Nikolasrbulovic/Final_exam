import { API } from "../shared/api";

export const createComment = (body, gallery_id) => {
  return API.post("signin", { body, gallery_id });
};
