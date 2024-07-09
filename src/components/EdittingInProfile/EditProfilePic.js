import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { encrypt } from "../Authorization&Encryption/EncryptingData";
import { editProfilePicture } from "../../redux-store/userSlice";

const EditProfilePic = (props) => {
  
  let dispatch = useDispatch();
  let { handleSubmit } = useForm();
  let { userObj } = useSelector((state) => state.user);
  const changeProfilepic = () => {
    
    let formData = new FormData();
    formData.append("photo", file, file.name);
   
    let encryptedUser = encrypt(userObj);
    formData.append("userObj", encryptedUser);
  
    dispatch(
      editProfilePicture({ formData: formData, isAdmin: userObj.isAdmin })
    );
   
    props.setShow(false);
   
  };
  const onDpSelect = (e) => {
    setFile(e.target.files[0]);
  };
  let [file, setFile] = useState(null);
  return (
    <Modal show={props.show} centered onHide={() => props.setShow(false)}>
      <Modal.Header>
        Edit Profile Pic
        <button
          type="button"
          className="btn-close"
          onClick={() => props.setShow(false)}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(changeProfilepic)}>
          {/* Profile Pic */}
          <div className="mb-3">
            <label htmlFor="pic">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              id="pic"
              onChange={onDpSelect}
              placeholder="Profile Picture"
              required
              accept="image/*"
            />
          </div>
          <button className="btn btn-warning d-flex justify-content-center text-light">
            SAVE
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default EditProfilePic;