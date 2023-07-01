import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  performCreateGallery,
  perforomGetGalleryById,
  perforomUpdateGallery,
} from "../store/gallery/slice";
import {
  selectGalleryById,
  selectGalleryErrorMessage,
  selectLoadingGalleryById,
} from "../store/gallery/selector";

const EditGallery = () => {
  const { id } = useParams();
  const gallery = useSelector(selectGalleryById);
  const loadingGallery = useSelector(selectLoadingGalleryById);
  const dispatch = useDispatch();
  const error = useSelector(selectGalleryErrorMessage);
  const [urls, setUrls] = useState([""]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    dispatch(perforomGetGalleryById(id));
  }, []);

  useEffect(() => {
    if (gallery) {
      setUrls(gallery.image_urls);
      setName(gallery.name);
      setDescription(gallery.description);
    }
  }, [gallery]);

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

    dispatch(perforomUpdateGallery({ id, name, description, image_urls }));
  };

  if (loadingGallery) {
    return (
      <div className="d-flex flex-row justify-content-center mt-5">
        <div class="spinner-border w-full text-center" role="status" />
      </div>
    );
  }
  return (
    <div className="form-signin w-50 m-auto mt-5">
      <form onSubmit={submitHandler}>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            name="name"
            defaultValue={gallery.name}
            onChange={(e) => handleNameInput(e)}
          />
          <label>Gallery Name</label>
        </div>
        <div className="form-floating mb-2">
          <textarea
            className="w-100 from-control "
            style={{ height: "100px" }}
            defaultValue={gallery.description}
            value={description}
            onChange={(e) => handleDescriptionInput(e)}
          ></textarea>
        </div>
        {urls?.map((url, index) => (
          <div className="form-floating mb-2" key={index}>
            <input
              type="text"
              className="form-control"
              defaultValue={url}
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

export default EditGallery;
