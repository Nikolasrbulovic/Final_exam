import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { performGetAllGalleries } from "../store/gallery/slice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllGalleries } from "../store/gallery/selector";
import SingleGallery from "../components/SingleGallery";
import { selectLastPage } from "../store/gallery/selector";
import { useState } from "react";

const MyGalleries = () => {
  const [nextPage, setNextPage] = useState(2);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(performGetAllGalleries());
  }, []);
  const galleries = useSelector(selectAllGalleries);
  console.log(galleries);

  const lastPage = useSelector(selectLastPage);

  const loadMoreHandler = () => {
    if (nextPage <= lastPage) {
      setNextPage((prev) => prev + 1);
      dispatch(performGetAllGalleries(nextPage));
    }
  };

  console.log(galleries);
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
        {galleries.map((gallery) => {
          return <SingleGallery gallery={gallery}></SingleGallery>;
        })}
      </div>
      {nextPage <= lastPage && (
        <button onClick={loadMoreHandler}>Load More</button>
      )}
    </div>
  );
};

export default MyGalleries;
