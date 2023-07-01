import jwt_decode from "jwt-decode";

const useLoggedUser = () => {
  return jwt_decode(localStorage.getItem("access_token"))?.sub;
};

export default useLoggedUser;
