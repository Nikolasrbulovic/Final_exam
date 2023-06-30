const SingleGallery = ({ gallery }) => {
  const date = new Date(gallery.created_at);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month}-${day}`;
  const userFirstName = gallery.user.first_name;
  const userLastName = gallery.user.last_name;
  return (
    <div className="col">
      <div className="card shadow-sm">
        <title>Placeholder</title>
        <img width="100%" height="225" src={gallery.image_urls[0]}></img>

        <div className="card-body">
          <p className="card-text">
            Gallery created by: {userFirstName + " " + userLastName}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Edit
              </button>
            </div>
            <small className="text-body-secondary">{formattedDate}</small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleGallery;
