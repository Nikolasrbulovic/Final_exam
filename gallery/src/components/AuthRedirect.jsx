import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const AuthRedirect = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  if (isAuth) {
    return <Navigate to={"/"}></Navigate>;
  }

  return <>{children}</>;
};
export default AuthRedirect;
