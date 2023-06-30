import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { performUserLogOut } from "../store/user/slice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../store/user/selectors";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(performUserLogOut());
    navigate("/");
  };

  return (
    <div className="px-3 py-2 text-bg-dark border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <div className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            Gallery
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <li>
                <a href="/" className="nav-link text-center text-white">
                  <div className="d-flex flex-column align-items-center">
                    <i
                      className="bi bi-images"
                      style={{ fontSize: "1.7rem" }}
                    ></i>
                    <span className="d-block">All Galleries</span>
                  </div>
                </a>
              </li>
              {token && (
                <>
                  <li>
                    <a
                      href="/my-galleries"
                      className="nav-link text-center text-white"
                    >
                      <div className="d-flex flex-column align-items-center">
                        <i
                          className="bi bi-image"
                          style={{ fontSize: "1.7rem" }}
                        ></i>
                        <span className="d-block">My Gallery</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="create"
                      className="nav-link text-center text-white"
                    >
                      <div className="d-flex flex-column align-items-center">
                        <i
                          className="bi bi-image"
                          style={{ fontSize: "1.7rem" }}
                        ></i>
                        <span className="d-block">Create Gallery</span>
                      </div>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="text-end">
            {!token && (
              <>
                <a href="/login">
                  <button type="button" className="btn btn-outline-light me-2">
                    Login
                  </button>
                </a>
                <a href="/register">
                  <button
                    type="button"
                    className="btn btn-light text-dark me-2"
                  >
                    Sign-up
                  </button>
                </a>
              </>
            )}

            {token && (
              <button
                type="button"
                className="btn btn-light text-dark me-2"
                onClick={logoutHandler}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
