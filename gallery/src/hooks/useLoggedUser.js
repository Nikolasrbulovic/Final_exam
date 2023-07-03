import jwt_decode from "jwt-decode";

const useLoggedUser = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return null;
  }
  return jwt_decode(localStorage.getItem("access_token"))?.sub;
};

export default useLoggedUser;
