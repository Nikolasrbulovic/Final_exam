import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUserId } from "../store/user/selectors";
import { useDispatch } from "react-redux";
import { performCreateGallery } from "../store/gallery/slice";
import { selectGalleryErrorMessage } from "../store/gallery/selector";
import { useNavigate } from "react-router-dom";

const CreateGallery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectGalleryErrorMessage);
  const [urls, setUrls] = useState([""]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const user_id = useSelector(selectUserId);

  const handleUrlChange = (index, e) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = e.target.value;
    setUrls(updatedUrls);
  };

  const handleAddUrlInput = () => {
    setUrls([...urls, ""]);
  };

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };
  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const image_urls = urls;

    dispatch(performCreateGallery({ name, description, image_urls, user_id }));
    setName("");
    setDescription("");
    setUrls([""]);
  };
  return (
    <div className="form-signin w-50 m-auto mt-5">
      <form onSubmit={submitHandler}>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => handleNameInput(e)}
          />
          <label>Gallery Name</label>
        </div>
        <div className="form-floating mb-2">
          <textarea
            className="w-100 from-control "
            style={{ height: "100px" }}
            value={description}
            onChange={(e) => handleDescriptionInput(e)}
          ></textarea>
        </div>
        {urls.map((url, index) => (
          <div className="form-floating mb-2" key={index}>
            <input
              type="text"
              className="form-control"
              value={url}
              onChange={(e) => handleUrlChange(index, e)}
            />
            <label> Image url : {index + 1}</label>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddUrlInput}
        >
          Add URL
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CreateGallery;
