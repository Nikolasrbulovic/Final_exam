import { useEffect, useState } from "react";
import { performGetMyGalleries } from "../store/gallery/slice";
import { useDispatch } from "react-redux";
import {
  selectMyGalleries,
  selectLastPageMyGallery,
  selectLoading,
} from "../store/gallery/selector";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SingleGallery from "../components/SingleGallery";

const MyGalleries = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const lastPage = useSelector(selectLastPageMyGallery);
  const loading = useSelector(selectLoading);

  const galleries = useSelector(selectMyGalleries);
  const [nextPage, setNextPage] = useState(2);
  useEffect(() => {
    if (!galleries) {
      dispatch(performGetMyGalleries());
    }
  }, [galleries]);

  const filter = () => {
    dispatch(
      performGetMyGalleries({
        searchTerm,
        shouldClearGalleries: true,
        page: 1,
      })
    );
    setNextPage(2);
  };

  const handleSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const loadMoreHandler = () => {
    if (nextPage <= lastPage) {
      setNextPage((prev) => prev + 1);
      dispatch(performGetMyGalleries({ page: nextPage, searchTerm }));
    }
  };

  return (
    <div>
      {!loading && (
        <div className="d-flex justify-content-center gap-3 my-3">
          <input
            className="form-control w-25"
            type="text"
            name="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
          />
          <button className="btn btn-outline-dark" onClick={filter}>
            Filter
          </button>
        </div>
      )}
      <div className="row row-cols-1 row-cols-sm-2 mx-3 row-cols-md-5 g-3">
        {galleries?.map((gallery, index) => {
          return <SingleGallery gallery={gallery} key={index}></SingleGallery>;
        })}
      </div>
      {loading && (
        <div className="d-flex flex-row justify-content-center mt-5">
          <div class="spinner-border w-full text-center" role="status" />
        </div>
      )}
      {nextPage <= lastPage && !loading && (
        <div className="d-flex flex-row justify-content-center my-3">
          <button className="btn btn-outline-dark" onClick={loadMoreHandler}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MyGalleries;
