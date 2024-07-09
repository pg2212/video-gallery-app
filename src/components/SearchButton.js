import React from "react";
import {FaSearch} from 'react-icons/fa'
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
const SearchButton = () => {
  let history = useHistory()
  let {videoObj} = useSelector((state)=>state.video)
  let {register, handleSubmit}  = useForm()
  function onSearch(search){
    let filteredData = videoObj.filter((value)=>{
      return value.videoName.toLowerCase().includes(search.searchItem.toLowerCase())
    })
    console.log("data", filteredData)
    history.push({pathname:"/searchresult", state:filteredData})
  }
  
   
  return (
    <form className="d-flex" onSubmit= {handleSubmit(onSearch)}>
      <input className="form-control rounded-0" id="searchItem" type="search" placeholder="Search" {...register("searchItem",{required: true})} > 
     
  </input>
  <button className=" btn-dark shadow-none " type="submit" data-bs-target="#searchItem"
      style={{marginRight: "200px"}}>
    <FaSearch />
  </button>
    </form>
  );
}

export default SearchButton;