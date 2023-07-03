import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { performGetAllGalleries } from "../store/gallery/slice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllGalleries, selectLoading } from "../store/gallery/selector";
import SingleGallery from "../components/SingleGallery";
import { selectLastPage } from "../store/gallery/selector";
import { useState } from "react";

const MyGalleries = () => {
  const [nextPage, setNextPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const loading = useSelector(selectLoading);
  const galleries = useSelector(selectAllGalleries);
  const lastPage = useSelector(selectLastPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!galleries.length) {
      dispatch(performGetAllGalleries());
    }
  }, []);

  const loadMoreHandler = () => {
    if (nextPage <= lastPage) {
      setNextPage((prev) => prev + 1);
      dispatch(performGetAllGalleries({ page: nextPage, searchTerm }));
    }
  };

  const filter = () => {
    dispatch(
      performGetAllGalleries({
        page: 1,
        searchTerm,
        shouldClearGalleries: true,
      })
    );
    setNextPage(2);
  };

  const handleSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
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
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 mx-3">
        {galleries.map((gallery, index) => {
          return (
            <SingleGallery gallery={gallery} index={index}></SingleGallery>
          );
        })}
      </div>
      {loading && (
        <div className="d-flex flex-row justify-content-center mt-5">
          <div class="spinner-border w-full text-center" role="status" />
        </div>
      )}
      {nextPage <= lastPage && !loading && (
        <div className="d-flex flex-row justify-content-center my-3 ">
          <button className="btn btn-outline-dark" onClick={loadMoreHandler}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MyGalleries;
