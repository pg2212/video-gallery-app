import Home from './components/Home'
import {getVideoDetails} from './redux-store/contentSlice'
import Register from './components/Register'
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'

import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer'
import AddContent from './components/AddContent';
import EditContent from './components/AdminDashboard/EditContent';
import { useState , useEffect} from 'react';

import {useDispatch} from 'react-redux'
import ResultPage from "./components/CategoryBasedPage";
import SearchResult from "./components/searchResult";
import UserProfilePage from './components/EdittingInProfile/UserProfilePage';
import WatchList from "./components/WatchList";

function App() {
  let {userObj,isLoading,isSuccess} = useSelector(state => state.user)
  let [token,setToken] = useState(null)
 
  
   const dispatch = useDispatch()

   useEffect(() => {
     setToken(window.localStorage.getItem("token"));  
  }, [isSuccess, token]);

   useEffect(() => {
     if (JSON.stringify(userObj) === JSON.stringify({})) {
       let token = window.localStorage.getItem("token");
      let encryptedUser = window.localStorage.getItem("userObj");
       if (token && encryptedUser) {
         let user = encryptedUser;
         dispatch(user);
         dispatch(getVideoDetails());
      //TEsting 
       
      }
     }
    
   }, []);
  
  return (
    
    <BrowserRouter>
   <div>
     <Navbar  />
     </div>
   

    <Switch>
    <Route exact path="/"><Home  /></Route>
      <Route path="/register"><Register /></Route>
     
      <Route exact path="/userdashboard/:name"> <UserDashboard /> </Route>
      <Route eaxct path="/admindashboard/:name"> <AdminDashboard /> </Route>
      <Route path = "/addcontent"><AddContent /></Route>
      <Route path = "/editcontent/:videoId"> <EditContent /></Route>
      <Route exact path={`/result/:type/:data`}>
          <ResultPage />
        </Route>
        <Route path="/searchResult">
          <SearchResult />
        </Route>
        <Route path="/mywatchlist">
          <WatchList />
        </Route>
        <Route path="/myprofile/:name">
            <UserProfilePage />
          </Route>
    </Switch>

    <Footer />
   
      </BrowserRouter>
  );
}

export default App;
