import React, { useState } from 'react'
import "./star.css";
import {FaStar} from "react-icons/fa"
const Star = () => {

    const[rating ,setRating] =useState(null) ;
    const[hover,setHover] =useState(null) ;
  return (
    <div>

        {
       
            [...Array(5)].map((star,i) =>{

                const ratingValue = i+1 ;
                return   <label>
                 <input className='rating'
                  type="radio"  name='rating'
        
                   value={ratingValue}
                   onClick={() => setRating(ratingValue)}
                 
                 
                />
                    <FaStar   className='star'  
                    color={ratingValue <= (hover || rating) ?"#ffc107" : "#808080"}  
                    onMouseEnter={()=>setHover(ratingValue)}
                    onMouseLeave = {()=>setHover(null)}
                    
                    />
                     </label>;
                    
                   
                    
            })
            
        }
         <p>rating is{rating}..</p>
     
        </div>
  )
}

export default Star
