import { Link } from "react-router-dom";

import useFormattedDate from "../hooks/useFormattedDate";
import useLoggedUser from "../hooks/useLoggedUser";

const SingleGallery = ({ gallery }) => {
  const formattedDate = useFormattedDate(gallery.created_at);

  const userFirstName = gallery.user.first_name;
  const userLastName = gallery.user.last_name;
  const userId = gallery.user?.id;

  const loggedUserId = useLoggedUser();

  return (
    <div className="col">
      <div className="card shadow-sm">
        <title>Placeholder</title>
        <img width="100%" height="225" src={gallery.image_urls[0]}></img>
        <p className="card-text m-3">Gallery Name: {gallery.name}</p>
        <div className="card-body">
          <p className="card-text">
            Gallery created by: {userFirstName + " " + userLastName}
          </p>
          <div className="d-flex justify-content-between gap-4 align-items-center">
            <div className="btn-group">
              <Link
                type="button"
                className="btn btn-sm btn-outline-secondary"
                to={`/galleries/${gallery.id}`}
              >
                View
              </Link>
              {loggedUserId === userId.toString() && (
                <Link
                  to={`/edit-gallery/${gallery.id}`}
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Edit
                </Link>
              )}
            </div>
            <small className="text-body-secondary">{formattedDate}</small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleGallery;
