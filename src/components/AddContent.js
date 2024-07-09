import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function AddContent() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let genre = [
    "action",
    "horror",
    "crime",
    "romance",
    "drama",
    "scifi",
    "comedy",
    "thriller",
    "fantasy",
    "animation",
    "darkhumor",
    "romcom"
  ];

  let [videoPic, setVideoPic] = useState(null);
  const videoPicSelect = (e) => {
    setVideoPic(e.target.files[0]);
  };

  let history = useHistory();

  const onContentSubmit = async (videoObj) => {
    let formData = new FormData();
    formData.append("videoPic", videoPic, videoPic.name);
    formData.append("videoObj", JSON.stringify(videoObj));
    let response = await axios.post("/content/addcontent", formData);
    console.log(response);
    let payload = response.data;
    if (payload.message === "video added successfully") {
      alert("video added successfully");
      history.push("/admindashboard");
    } else {
      alert("video could not be added");
    }
  };
  return (
    <div className=" text-light bg-dark">
      <form
        className="col-8 col-md-6 mx-auto pt-3"
        onSubmit={handleSubmit(onContentSubmit)}
      >
        <label for="videoName">Name of the Video</label>
        <input
          type="text"
          className="form-control mb-3"
          id="videoName"
          name="videoName"
          {...register("videoName", { required: true })}
        />

        <div className=" mb-3">
          <label for="releaseYear">Release Year</label>
          <input
            type="text"
            className="form-control"
            id="releaseYear"
            name="releaseYear"
            {...register("releaseYear", { required: true })}
          />
        </div>
        <div className=" mb-3">
          <label for="language">Language</label>
          <input
            type="text"
            className="form-control"
            id="language"
            name="language"
            {...register("language", { required: true })}
          />
        </div>


        <div className="form-check form-check-inline mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            id="movie"
            value="movie"
            {...register("category", { required: true })}
          />
          <label className="form-check-label" for="movie">
            Movie
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            id="tvshow"
            value="tvshow"
            {...register("category", { required: true })}
          />
          <label className="form-check-label" for="tvshow">
            TV Show
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            id="kids"
            value="kids"
            {...register("category", { required: true })}
          />
          <label className="form-check-label" for="kids">
            Kids
          </label>
        </div>
       
        <div class="mb-3">
          <label for="description" className="form-label">
            Description
          </label>
          <textarea
            class="form-control"
            id="decription"
            rows="3"
            {...register("description", { required: true })}
          ></textarea>
        </div>
        
        <p className="text-light m-0">Genres</p>
      {genre.map((gen, index) => {
        return (
          <div className="d-inline" key={index}>
            <input
              type="checkbox"
              className="btn-check btn-check-inline"
              id={gen}
              autoComplete="off"
              value={gen}
              {...register("genre", { required: true })}
            />
            <label
              className="btn btn-outline-primary noshadow me-2 mb-3 border-0 text-capitalize "
              htmlFor={gen}
            >
              {gen}
            </label>
          </div>
        );
      })}
      {errors.genre?.type === "required" && (
        <p className="text-danger">* Movie Genre is Required</p>
      )}
        <div class="mb-3 mt-3">
          <input
            type="file"
            className="form-control"
            name="videoPic"
            id="videoPic"
            onChange={videoPicSelect}
          />
          <label for="videoPic"></label>
        </div>
        <button className="btn btn-success mt-3 mb-4 d-block w-50 mx-auto">Submit Video</button>
      </form>
    </div>
  );
}

export default AddContent;
