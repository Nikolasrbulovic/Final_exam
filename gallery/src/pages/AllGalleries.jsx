import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { performGetAllGalleries } from "../store/gallery/slice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllGalleries } from "../store/gallery/selector";
import SingleGallery from "../components/SingleGallery";
import { selectLastPage } from "../store/gallery/selector";
import { useState } from "react";

const MyGalleries = () => {
  const [nextPage, setNextPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(performGetAllGalleries());
  }, []);
  const galleries = useSelector(selectAllGalleries);

  const lastPage = useSelector(selectLastPage);

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
      <div className="d-flex justify-content-center gap-3 my-3">
        <input
          className="form-control w-25"
          type="text"
          name="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearchTermChange(e.target.value)}
        />
        <button className="btn btn-outline-dark" onClick={() => filter()}>
          Filter
        </button>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 mx-3">
        {galleries.map((gallery) => {
          return <SingleGallery gallery={gallery}></SingleGallery>;
        })}
      </div>
      {nextPage <= lastPage && (
        <div className="d-flex flex-row justify-content-center my-5 ">
          <button onClick={loadMoreHandler}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default MyGalleries;
