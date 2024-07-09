import React, { useState ,useContext} from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";
import { editContent } from "../../redux-store/contentSlice";
import EditContentForm from "./EditContentForm";

const EditContent = () => {
 
  let dispatch = useDispatch();
  let { videoObj } = useSelector((state) => state.video);
  let { mid } = useParams();
  let value = videoObj.find((value) => value._id === mid);
  let [file, setFile] = useState(null);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: value });
  const onContentSelect = (e) => {
    setFile(e.target.files[0]);
  };
  // Edit contet function
  function onEditContentSubmit(contentObj) {
   
    let index = videoObj.findIndex(
      (obj) => obj._id === contentObj._id
    );
    let formData = new FormData();
   
    formData.append("photo", file, file.name);
    formData.append("contentObj", JSON.stringify(contentObj));
    dispatch(editContent({ index: index, formData: formData }));
    
  }
  return (
    <div
      className="fluid mt-4"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${value?.image})`,
        backgroundPosition: "top",
      }}
    >
      <div
        className="row pt-5 mx-auto"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        {/* Form */}
        <EditContentForm
          register={register}
          type="Update"
          handleSubmit={handleSubmit}
          onContentSelect={onContentSelect}
          onContentSubmit={onEditContentSubmit}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default EditContent;