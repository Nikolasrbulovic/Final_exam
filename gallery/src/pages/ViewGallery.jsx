import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  performDeleteGallery,
  perforomGetGalleryById,
} from "../store/gallery/slice";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGalleryById } from "../store/gallery/selector";
import useLoggedUser from "../hooks/useLoggedUser";
import Comments from "../components/Comments";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const ViewGallery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const gallery = useSelector(selectGalleryById);
  console.log(gallery);

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
    <div>
      <Modal deleteGallery={deleteGalleryHandler}></Modal>
      <div className="d-flex flex-row justify-content-center">
        <div>
          <p>
            <strong>Gallery Name:</strong> {gallery.name}
          </p>
          <p>
            <strong>Gallery description:</strong> {gallery.description}
          </p>
          <Link to={`/authors/${gallery.user?.id}`}>
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
                class={index === 0 ? "carousel-item active" : "carousel-item"}
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
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center mt-3">
        {userId === gallery.user?.id.toString() && (
          <button
            className="btn btn-danger justify-content-center"
            data-bs-toggle="modal"
            data-bs-target="#modal"
          >
            Delete Gallery
          </button>
        )}
      </div>
      <div>
        <Comments gallery={gallery} galleryId={gallery.id}></Comments>
      </div>
    </div>
  );
};

export default ViewGallery;
