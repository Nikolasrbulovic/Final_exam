import { useState } from "react";
import { useDispatch } from "react-redux";
import { performCreateComment } from "../store/gallery/slice";
import useFormattedDate from "../hooks/useFormattedDate";

const Comments = ({ gallery, galleryId }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === "") {
      return;
    }
    dispatch(
      performCreateComment({
        body: newComment,
        gallery_id: galleryId,
      })
    );

    // Update the comments list with the new comment

    setNewComment("");
  };
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };
    return dateObj.toLocaleString("en-US", options);
  };

  return (
    <div>
      <div className="comments px-3 py-3">
        <h3>Comments</h3>
        {gallery.comments?.map((comment) => (
          <div
            className="comment d-flex px-3 border flex-column mb-3 border-dark-subtle w-50 rounded justify-content-center bg-light bg-gradient"
            key={comment.id}
          >
            <div className="d-flex  mt-3 justify-content-between">
              <p>
                <strong>
                  {comment.user?.first_name + " " + comment.user?.last_name}
                </strong>
              </p>
              <p>{formatDate(gallery.created_at)}</p>
            </div>
            <p className="text-break">{comment.body}</p>
            {comment.user.id && (
              <div className="d-flex justify-content-end">
                <button className=" btn btn-outline-danger mb-3 w-25">
                  Delete Comment
                  <i class="bi bi-trash3 ms-2"></i>
                </button>
              </div>
            )}
          </div>
        ))}
        <form className=" px-3 mb-2" onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write your comment..."
            maxLength={1000}
            required
            className="form-control  mb-4 w-50"
            style={{ resize: "none" }}
          />
          <div className="d-flex justify-content-center w-50 ">
            <button type="submit" className=" btn btn-outline-dark">
              Add Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
