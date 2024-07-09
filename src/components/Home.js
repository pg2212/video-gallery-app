import React from "react"
import hrcard1 from '../images/hrcard1.png';
import hrcard2 from '../images/hrcard2.jpg'
import homebg from '../images/homebg.jpg'
import {FaRegHandPointRight} from 'react-icons/fa'

function Home(){
   return(
   <div>
     <div className="card bg-dark text-white">
  <img src={homebg} className="card-img cardImage" height="500px" />
  <div className="card-img-overlay">
    <h3 className="card-title pt-5 text-bold text-center">Welcome to video gallery</h3>
    <p className="card-text display-3 text-center">Enjoy newly released movies , series any where anytime.</p>
   
  </div>
</div>
                                                                         
        <div className="card bg-transparent">
  <div className="row">
    <div className="col-md-4">
      <img src={hrcard1} className="img-fluid rounded-start"/>
    </div>
    <div className="col-md-8">
      <div className="card-body text-light">
        <h5 className="card-title display-5 text-center">Become A Member</h5>
        <p className="card-text cardfont">With your membership, 
        you have access to unlimited content, blockbuster movies, series, documentaries and more.
           </p>
           <button className="btn btn-primary mx-auto d-block mt-5" > Get  Started <FaRegHandPointRight/> </button>
      </div>
    </div>
  </div>
</div>
 {/* horizontal card 2 */}
 <div className="card bg-transparent">
  <div className="row">
    
    <div className="col-md-8">
      <div className="card-body text-light">
        <h5 className="card-title display-5 text-center">   Watch Anywhere</h5>
        <p className="card-text cardfont text-center"> Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
</p>
        
      </div>
    </div>
    <div className="col-md-4">
      <img src={hrcard2} className="img-fluid rounded-start"/>
    </div>
  </div>
</div>

       </div>
      
   
   )
}
export default Home;