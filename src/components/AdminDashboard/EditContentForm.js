import React from "react";
const EditContentForm = ({
  register,
  handleSubmit,
  onContentSubmit,
  errors,
  onContentSelect,
  type,
}) => {
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
 
  return (
    <form
      className="col-11 col-sm-8 col-md-6 mx-auto"
      onSubmit={handleSubmit(onContentSubmit)}
    >
      {/* Movie Name */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="videoName"
          placeholder="Video Name"
          {...register("videoName", { required: true })}
        />
        {errors.videoNamename?.type === "required" ? (
          <label className="text-danger">* Movie Name is Required</label>
        ) : (
          <label htmlFor="videoName">Movie Name</label>
        )}
      </div>
      {/* Category */}
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="movie"
          id="movie"
          value="movie"
          {...register("category", { required: true })}
        />
        <label className="form-check-label text-light" htmlFor="movie">
          Movie
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="tvshow"
          id="tvshow"
          value="tvshow"
          {...register("category", { required: true })}
        />
        <label className="form-check-label text-light" htmlFor="tvshow">
          Tv Show
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="kids"
          id="kids"
          value="kids"
          {...register("category", { required: true })}
        />
        <label className="form-check-label text-light" htmlFor="kids">
          Kids
        </label>
      </div>
      {errors.category?.type === "required" && (
        <p className="text-danger">* Movie Category is Required</p>
      )}
      <div className=" mb-3">
          <label for="releaseYear">Release Year</label>
          <input
            type="text"
            className="form-control"
            placeholder="Release Year"
            id="releaseYear"
            name="releaseYear"
            {...register("releaseYear", { required: true })}
          />
           {errors.releaseYear?.type === "required" && (<p> *Release year is required</p>)}
        </div>
       
      {/* Movie Description */}
      <div className="form-floating my-3">
        <textarea
          className="form-control"
          placeholder="Movie Description"
          id="description"
         
          {...register("description", { required: true })}
        ></textarea>
        {errors.description?.type === "required" ? (
          <label className="text-danger">* Movie Description is Required</label>
        ) : (
          <label htmlFor="description">Movie Description</label>
        )}
      </div>
      {/* Genres */}
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
      
      <div className=" mb-3">
          <label for="language">Language</label>
          <input
            type="text"
            className="form-control"
            id="language"
            name="language"
            placeholder="Language"
            {...register("language", { required: true })}
          />
           {errors.language?.type === "required" && (
        <p className="text-danger">* Video Language is Required</p>
      )}
        </div>
     
      {/* Movie Picture */}
      <div className="mb-3">
        <label htmlFor="videoPic" className="text-light">
          Video Picture
        </label>
        <input
          type="file"
          className="form-control"
          id="videoPic"
         
          onChange={onContentSelect}
          required
          accept="image/*"
        />
      </div>
      <button className="btn btn-primary mx-auto d-block text-light mb-3">
        {type}
      </button>
    </form>
  );
};

export default EditContentForm;