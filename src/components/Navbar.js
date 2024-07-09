import React, { useEffect,useState } from "react";
import { NavLink, Link } from "react-router-dom";
import SearchButton from "./SearchButton";
import { useSelector, useDispatch } from "react-redux";
import { clearLoginStatus } from "../redux-store/userSlice";


import { getWatchList } from "../redux-store/watchListSlice";
import Login from './Login'
import { useHistory } from "react-router";
import {FaVideo} from 'react-icons/fa'


function Navbar() {
  let { userObj, isSuccess } = useSelector((state) => state.user);
  let {userType,name} = userObj;
  let dispatch = useDispatch();
  let history = useHistory()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onUserLogout = () => {
    localStorage.clear();
    dispatch(clearLoginStatus());
  };
  let activeLinkStyles = {
    fontWeight: "bold",
    color: "#CCDFFF",
  };
  useEffect(() => {
    dispatch(getWatchList({ email: userObj.email }));

  }, [dispatch,userObj.email]);
  return (
   
    <div>
      <nav className="navbar navbar-dark navbar-expand-sm bg-dark">
        <div className="container-fluid">
          <a href="#" className="navbar-brand text-light ps-5">
         <FaVideo />  Video-Gallery
          </a>
          <button
            className="navbar-toggler "
            data-bs-toggle="collapse"
            data-bs-target="#secondaryNavbar"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="secondaryNavbar">
            {isSuccess?(
                <> 
                
                     <ul className="navbar-nav d-flex pe-5">
              <li className="nav-item">
                <NavLink
                  activeStyle={activeLinkStyles}
                  className="nav-link"
                  to={userType === "user"? `/userdashboard/${name}`: `/admindashboard/${name}`}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  activeStyle={activeLinkStyles}
                  className="nav-link"
                  to="/result/category/movie"
                >
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeStyle={activeLinkStyles}
                  className="nav-link"
                  to="/result/category/tvshow"
                >
                  TV Shows
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeStyle={activeLinkStyles}
                  className="nav-link"
                  to="/result/category/kids"
                >
                  Kids
                </NavLink>
              </li>
            </ul>
          
          <SearchButton />
          <ul className=" list-unstyled d-flex ms-auto mt-3">
            <li className="text-light">
              <img src={userObj.image} className="rounded-circle userImage" />
              {userObj.name}
            </li>

            <li>
              {" "}
              <div className="dropdown me-4">
                <button
                  className="shadow-none btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul
                  className="dropdown-menu bg-dark dropdown-menu-lg-end "
                  aria-labelledby="#dropdownMenu"
                >
                  <li>
                    <Link className="dropdown-item text-light" to={`/myprofile/${userObj.name}`}>
                      Account & Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/mywatchlist"
                    >
                      Watchlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-light"
                      to="/"
                      onClick={onUserLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
         
      </>
              ):(
                <ul className="navbar-nav d-flex ms-auto pe-5">

          
        
                <li className="nav-item">
                <button onClick={()=> history.push('/register')}
                    className="btn btn-outline-light border-0 noshadow"
                    type="submit"
                  
                  >
                  Register
                  </button>
               
                   
                 </li>
                 <li className="nav-item">
                 <button
                    className="btn btn-outline-light border-0 noshadow"
                    type="submit"
                    onClick= {handleShow}
                  >
                   Login
                  </button>
                   
                 </li> 
            </ul> 

              )
            }
            </div>
            </div>
            </nav>
            
            <Login show={show} handleClose={handleClose} />
            </div>
           
    
    
  );
}

export default Navbar;
