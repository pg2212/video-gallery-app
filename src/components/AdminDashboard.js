import React from 'react'
import {useHistory} from 'react-router-dom'
import UserHome from  './UserHome' 
function AdminDashboard() {
    let history = useHistory()
    return (
        <div>
            
  <button className="btn btn-info d-block mx-auto text-decoration-none mt-5" onClick={()=>history.push("/addcontent")}> Add Content</button> 
           
          <UserHome />  
        </div>
    )
}

export default AdminDashboard
