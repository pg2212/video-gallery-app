import Modal from "react-bootstrap/Modal";

import {
  addToWatchList,
  deleteFromWatchList,
} from "../redux-store/watchListSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteContent } from "../redux-store/contentSlice";
import {FaEdit} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'
import {FaPlayCircle} from 'react-icons/fa'


function VideoModal({ mModal, show, handleClose }) {
  let history = useHistory();
  let dispatch = useDispatch();
  let { userObj } = useSelector((state) => state.user);
  let { userType, email } = userObj;
  let { watchList } = useSelector((state) => state.watchList);
   console.log("usertype", userType)
  function isPresent(videoId) {
    let list = watchList.find((id) => id === videoId);
    return list;
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          {userType === "admin" ? (
            <div>
              <button className=" btn btn-secondary"
                onClick={() => history.push(`/editcontent/${mModal?._id}`)}
              >
               <FaEdit />
              </button>
              <button className=" ms-2 btn btn-danger"
                onClick={() =>
                  dispatch(deleteContent({ videoName: mModal?.videoName }))
                }
              >
               <MdDelete />
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <span className="modalheader"> {mModal?.videoName} </span>
          <button
          type="submit"
          className="btn-close ms-auto"
          onClick={handleClose}
        ></button>
        </Modal.Header>
        <Modal.Body>
        
          <img src={mModal?.image} width="100%" alt="" />
         
          <h6> {mModal?.releaseYear} </h6>
          {mModal?.genre.map((gen) => (
            <span className="text-capitalize"> {gen} </span>
          ))}
          <p> {mModal?.description} </p>
          {
            <div className="modalfooter">
              <button className=" displa-6 btn btn-dark" onClick={() => history.push("/playvideo")}> <FaPlayCircle /> </button> 
                {isPresent(mModal?._id) === undefined ? (
                  <button className="btn btn-success text-light float-end"
                    onClick={() =>
                      dispatch(
                        addToWatchList({ email: email, id: mModal?._id })
                      )
                    }
                  >
                   
                  Add to Watchlist
                  </button>
                ) : (
                  <button className=" btn btn-warning float-end"
                    onClick={() =>
                      dispatch(
                        deleteFromWatchList({
                          email: email,
                          id: mModal?._id,
                        })
                      )
                    }
                  >
                  
                    Remove from Watchlist
                  </button>
                  
                )}
             
            </div>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VideoModal;
