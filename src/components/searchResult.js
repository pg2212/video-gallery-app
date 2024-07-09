import React, { useEffect, useState } from "react";
import DisplayContent from "./DisplayContent";
import { useLocation } from "react-router-dom";
const SearchResult = () => {
  let [result, setResult] = useState([]);
  let { state } = useLocation();
  useEffect(() => {
    setResult([...state]);
  }, [state]);
  return (
    <div className="fluid-container mt-4">
      {result.length === 0 ? (
        <p className="text-center text-info">No Result Found</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mx-2">
            <h2 className="text-light"> Your search results are </h2>
          {result.map((obj, key) => {
            return <DisplayContent obj={obj} key={key} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResult;