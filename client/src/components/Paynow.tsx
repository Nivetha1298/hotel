import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';





const Paynow = () => {

    const {user}=useContext(AuthContext);
    const location:any =  useLocation();
    console.log(location.state)

    const roomsDataBooked = (rooms)=>{
        let bookedRooms = []
        location.state.data.map((room)=>{
            for(let i =0 ;i<rooms.length;i++){
            room.roomNumbers.map((e)=>{
                if(e._id === rooms[i]){
                   let roomData = {
                    number:e.number,
                    title: room.title,
                    price:room.price,
                    maxPeople:1
                   }
                   bookedRooms.push(roomData)
                }
            })
         }
        })
        return bookedRooms
    }

const Handlepay=()=>{
   const details = roomsDataBooked(location.state.selectedRooms)
console.log(details)
 axios.post("http://localhost:8005/api/payment"  , {
    details  ,
    user_id:user._id
 })  

.then((res)=>{
    if(res.data.url){
        window.location.href = res.data.url
        console.log(res.data.url)
    }
})
.catch((err)=>{

    console.log(err.message);

   })







   
}

  return (
    <>
    
    
    <button onClick={()=>Handlepay()}>Reservenow!</button>
    
    </>
  
  )
}

export default Paynow