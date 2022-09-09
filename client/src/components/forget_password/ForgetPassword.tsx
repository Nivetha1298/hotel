import axios from 'axios';
import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = ({show,setShow}) => {
    const [formData,setFormData] = useState({
        email:"",code:"",password:""
    }) 

    const navigate = useNavigate();
    const handleClick = () =>{
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
      await axios.post("http://localhost:8005/api/auth/vpm",formData)
      await navigate("/cpass")
    }
    const handleChange = (e:any) =>{
      setFormData({...formData,[e.target.name]:e.target.value}) 
      setShow({...formData,[e.target.name]:e.target.value}) 
      console.log(show);
      
  }
  return (
    <div style={{height:"100vh",backgroundColor:"rgb(163, 163, 73)"}}>
       <Link to="/auth"> <i className="fa-solid fa-backward mt-5 backward"></i><span className='backwardText'>Back to Login Page</span></Link>
    <div className='container w-50 position-fixed forgotPasswordBG'>
   
        {<form onSubmit={handleSubmit} autoComplete="off">
        <input className='form-control mb-3' type="email" name='email' placeholder='Please enter your Email Address' onChange={handleChange}/>
        <button type="submit" className='btn btn-danger w-100 forgotPasswordSubmit'  onClick={handleClick}>Submit</button>
        </form>
      }
     
    </div>
    </div>
  )
}

export default ForgotPassword