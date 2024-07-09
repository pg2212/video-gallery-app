
import React from 'react'

import CategoryBasedRows from './CategoryBasedRows'

function UserHome() {
   
    
    return (
        
   <div>
        <h3 className="text-light ms-4"> Movies </h3>
       <CategoryBasedRows category="movie" />
       <h3 className="text-light ms-4"> Tv Series </h3>
       <CategoryBasedRows category= "tvshow" />
       <h3 className="text-light ms-4"> Kids </h3>
       <CategoryBasedRows category = "kids" />
       
                </div>
    )
}

export default UserHome
