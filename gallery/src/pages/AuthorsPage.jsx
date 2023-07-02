import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { performGetUserWithGalleries } from "../store/gallery/slice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUserGalleries } from "../store/gallery/selector";
import { useParams } from "react-router-dom";
import SingleGallery from "../components/SingleGallery";
import { selectLastPageAuthors } from "../store/gallery/selector";

const AuthorsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const lastPage = useSelector(selectLastPageAuthors);
  const galleries = useSelector(selectUserGalleries);
  const [nextPage, setNextPage] = useState(2);
  useEffect(() => {
    dispatch(performGetUserWithGalleries(id));
  }, []);
  const loadMoreHandler = () => {
    if (nextPage <= lastPage) {
      setNextPage((prev) => prev + 1);
      dispatch(performGetUserWithGalleries({ id, page: nextPage, searchTerm }));
    }
  };
  const handleSearchTermChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const filter = () => {
    dispatch(
      performGetUserWithGalleries({
        id,
        searchTerm,
        shouldClearGalleries: true,
        page: 1,
      })
    );
    setNextPage(2);
  };
  console.log(galleries);
  return (
    <div>
      <div>
        <div className="d-flex justify-content-center my-3">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
          />
          <button onClick={filter}>Filter</button>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
          {galleries.map((gallery) => {
            return <SingleGallery gallery={gallery}></SingleGallery>;
          })}
        </div>
        {nextPage <= lastPage && (
          <div className="d-flex flex-row justify-content-center my-5">
            <button onClick={loadMoreHandler}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorsPage;
