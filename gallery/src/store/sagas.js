import * as userSagas from "./user/saga";
import * as gallerySagas from "./gallery/saga";
const sagas = {
  ...userSagas,
  ...gallerySagas,
};

export default sagas;
