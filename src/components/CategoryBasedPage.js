import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DisplayContent from "./DisplayContent";
const ResultPage = () => {
  let { videoObj, isSuccess } = useSelector(
    (state) => state.video
  );
  let { type, data } = useParams();
  let [result, setResult] = useState([]);
  
  useEffect(() => {
    if (videoObj.length !== 0) {
      setResult(
        videoObj.filter((value, index) => {
          if (type === "category") {
            return value.category === data;
          }
          if (type === "genre") {
            let genres = value.genre;
            let arr = genres.filter((genre) => genre === data);
            return arr[0] === data;
          }
          if (type === "language") {
            let languages = value.language;
            let arr = languages.filter((language) => language === data);
            return arr[0] === data;
          }
          return 0;
        })
      );
    }

    // eslint-disable-next-line
  }, [isSuccess, data]);
  return (
    <div className="fluid-container my-4">
      {result.length === 0 ? (
        <p className="text-center text-info">No Result found</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5  mx-2">
          {
            result.map((obj, key) => {
            return <DisplayContent obj={obj} key={key} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ResultPage;