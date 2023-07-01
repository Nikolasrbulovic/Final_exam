import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  performDeleteGallery,
  perforomGetGalleryById,
} from "../store/gallery/slice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGalleryById } from "../store/gallery/selector";
import { selectUser } from "../store/user/selectors";
import useLoggedUser from "../hooks/useLoggedUser";

const ViewGallery = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gallery = useSelector(selectGalleryById);
  const userId = useLoggedUser();

  useEffect(() => {
    dispatch(perforomGetGalleryById(id));
  }, []);
  const deleteGalleryHandler = () => {
    dispatch(performDeleteGallery(id));
  };
  console.log(userId, gallery.user?.id);
  return (
    <div>
      <div className="d-flex flex-row justify-content-center">
        <div>
          <p>Gallery Name: {gallery.name}</p>
          <p>Gallery description: {gallery.description}</p>
        </div>
        {userId === gallery.user?.id.toString() && (
          <button className="btn btn-primary" onClick={deleteGalleryHandler}>
            delete
          </button>
        )}
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
    </div>
  );
};

export default ViewGallery;
