import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoDetails } from "../redux-store/contentSlice";
import VideoModal from "./videoModal";

function CategoryBasedRows({ category }) {
  let dispatch = useDispatch();
  let [videos, setVideos] = useState([]);
  let { videoObj } = useSelector((state) => state.video);

  
  useEffect(() => {
    console.log("hi")
    dispatch(getVideoDetails());
  }, []);
  useEffect(() => {
    console.log("help")
    setVideos(videoObj);
  }, [videoObj]);


 const fd = videos.filter((video) => video.category == category) 

 const [show, setShow] = useState(false);
 const [mModal, setModal] = useState(null)

 const handleClose = () => setShow(false);
 function handleShow(movie){
     setModal(movie)
     console.log("movie",movie)
    setShow(true);
 } 

  return (
    <div>
      <div className=" container-fluid row">
       
        {videos.length !== 0 && (
          <>
            <div className="row-posters scroll-pane">
              {
              fd.map((video, index) => {
                return (
                  <span>
                    <img key={index} className="row-poster" src={video.image} onClick= {()=> handleShow(video)
                     }/>

                    
                  </span>
                );
              })}
            </div>
            <VideoModal show={show} handleClose={handleClose} mModal={mModal} />
          </>
        )}
      </div>
    </div>
  );
}

export default CategoryBasedRows;
