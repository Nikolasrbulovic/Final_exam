import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  performDeleteGallery,
  perforomGetGalleryById,
} from "../store/gallery/slice";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGalleryById, selectLoading } from "../store/gallery/selector";
import useLoggedUser from "../hooks/useLoggedUser";
import Comments from "../components/Comments";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const ViewGallery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const gallery = useSelector(selectGalleryById);
  const loading = useSelector(selectLoading);
  const userId = useLoggedUser();

  useEffect(() => {
    dispatch(perforomGetGalleryById(id));
  }, []);
  const deleteGalleryHandler = () => {
    dispatch(
      performDeleteGallery({ onSuccess: () => navigate("/my-galleries"), id })
    );
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border d-flex justify-content-center m-5"
            role="status"
          >
            <span class="sr-only"></span>
          </div>
        </div>
      ) : (
        <div>
          <Modal
            id="delete-gallery"
            deleteHandler={deleteGalleryHandler}
          ></Modal>
          <div className="d-flex flex-row justify-content-center text-wrap">
            <div className="d-flex row w-50 mx-2">
              <h1 className="d-flex justify-content-center display-5">
                Gallery
              </h1>
              <h1 className="d-flex justify-content-center display-1">
                {gallery.name}
              </h1>
              <div className="border border-light border-2 rounded-2 bg-light border-dark-subtle mb-3">
                <h5 className="text-break mt-2 ">Gallery description: </h5>
                <p className="text-break lead">{gallery.description}</p>
              </div>
              <Link to={`/authors/${gallery.user?.id}`} className="link-dark">
                <p>
                  Authors name:{" "}
                  {gallery.user?.first_name + " " + gallery.user?.last_name}
                </p>
              </Link>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <div
              id="carouselExampleIndicators"
              class="carousel slide w-50"
              style={{ height: "500px" }}
            >
              <div class="carousel-inner">
                {gallery.image_urls?.map((imageUrl, index) => (
                  <div
                    class={
                      index === 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <img
                      src={imageUrl}
                      class="d-block w-100"
                      height="500"
                      alt="..."
                    />
                  </div>
                ))}
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center mt-3">
            {userId === gallery.user?.id.toString() && (
              <button
                className="btn btn-danger justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#delete-gallery"
              >
                Delete Gallery
              </button>
            )}
          </div>
          <div>
            <Comments gallery={gallery} galleryId={gallery.id}></Comments>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewGallery;
