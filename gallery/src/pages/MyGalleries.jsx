import { useEffect } from "react";
import { performGetMyGalleries } from "../store/gallery/slice";
import { useDispatch } from "react-redux";
import { selectMyGalleries } from "../store/gallery/selector";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SingleGallery from "../components/SingleGallery";
const MyGalleries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(performGetMyGalleries());
  }, []);
  const galleries = useSelector(selectMyGalleries);
  console.log(galleries);
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
        {galleries.map((gallery) => {
          return <SingleGallery gallery={gallery}></SingleGallery>;
        })}
      </div>
    </div>
  );
};

export default MyGalleries;
