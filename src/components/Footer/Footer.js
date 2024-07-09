import React from 'react'
import {FaCopyright} from 'react-icons/fa'

function Footer(){
  return(
    <footer className="footer mt-5">
        <ul className="footermenu d-flex  pt-3 ">
           
            <li> Privacy Policy
            </li>
            <li>About US</li>
            <li>Term of Use</li>
            <li>Contact Us</li>
           <li>Customer Support </li>  
        </ul>
        <p className="text-center pb-3 mt-5">< FaCopyright />  Copyright 2021, Video-gallery. All rights reserved.</p>
    </footer>
  )
}

export default Footer;