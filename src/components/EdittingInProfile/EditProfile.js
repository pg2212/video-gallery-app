import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { editUserProfile } from "../../redux-store/userSlice";

const EditProfile = (props) => {
 
  let dispatch = useDispatch();
  let { userObj, isError, invalidLoginMessage } = useSelector(
    (state) => state.user
  );
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [userRegistrationStatus, setUserRegistrationStatus] = useState("");
  // Edit profile Function
  const changePassword = (newUser) => {
    
    newUser.image = userObj.image;
    newUser.userType = userObj.userType;
   
    newUser._id = userObj._id;
    newUser.email = userObj.email;
    
    dispatch(editUserProfile(newUser));
    
  };
  useEffect(() => {
    setUserRegistrationStatus(invalidLoginMessage);
    // eslint-disable-next-line
  }, [isError]);
  return (
    <Modal
      show={props.password}
      centered
      onHide={() => props.setPassword(false)}
    >
      <Modal.Header>
        <h5>
          Change Password{" "}
          <span className="text-danger text-center">
            *{userRegistrationStatus}
          </span>
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => props.setPassword(false)}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(changePassword)}>
          {/* Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              defaultValue={userObj.name}
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" ? (
              <label className="text-danger">* Name is Required</label>
            ) : (
              <label htmlFor="name">Name</label>
            )}
          </div>
          {/* Old Password */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="on"
              placeholder="Previous Password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" ? (
              <label className="text-danger">
                *Previous Password is Required
              </label>
            ) : (
              <label htmlFor="password">Previous Password</label>
            )}
          </div>
          {/* New Password */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="npassword"
              autoComplete="on"
              placeholder="New Password"
              {...register("npassword", { required: true })}
            />
            {errors.npassword?.type === "required" ? (
              <label className="text-danger">*New Password is Required</label>
            ) : (
              <label htmlFor="npassword">New Password</label>
            )}
          </div>
          <button className="btn btn-warning d-flex justify-content-center text-light">
            UPDATE
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfile;