import React from "react";
import { useSelector } from "react-redux";

import DisplayContent from "./DisplayContent";
const MyWatchList = () => {
  let { watchList } = useSelector((state) => state.watchList);
  let { videoObj } = useSelector((state) => state.video);
  
  
  let watchListArray = videoObj.filter((obj) => {
    return watchList.includes(obj._id);
  });
  return (
    <div className="my-5">
      {watchList.length === 0 ? (
        <p className="text-center my-4 text-light">
          Add Some thing to watch List
        </p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mx-2">
          <h3 className="text-center"> Your Watchlist </h3>
          {watchListArray.map((obj, key) => {
            return <DisplayContent obj={obj} key={key}  />;
          })}
        </div>
      )}
    </div>
  );
};
export default MyWatchList;