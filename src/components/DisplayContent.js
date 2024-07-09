import React, {useState} from "react";
import VideoModal from "./videoModal";


function DisplayContent(video) {
    const [show, setShow] = useState(false);
    const [mModal, setModal] = useState(null)
   
    const handleClose = () => setShow(false);
    function handleShow(video){
        setModal(video)
        console.log("movie",video)
       setShow(true);
    }
  

  

  return (
    <div className=" container-fluid row">
      
          <div className="col">
            
             
                <div className="card bg-transparent" key={video.obj.key}>
                  <div className="card-body">
                    <img src={video.obj.image} className="w-100" height="270px" onClick={()=> handleShow(video.obj)} />
                    <h6 className="text-light text-center">{video.obj.videoName} </h6>
                    <span className="text-light"> {video.obj.releaseYear} </span>
                    {video.obj.genre.map((gen) => (
                      <span className="text-capitalize text-light">  | {gen}  </span>
                    ))}
                  </div>
                  <VideoModal show={show} handleClose={handleClose} mModal={mModal} />
                </div>
            
            
          </div>
        
      
    </div>
  );
}

export default DisplayContent;
