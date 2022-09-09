import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePassword = ({show,setShow}) => {

  
    const [formData,setFormData] = useState({
        email:show?.email,code:"",password:""
    }) 
 
    console.log(show?.email);
    
    const navigate = useNavigate();
   
 
const ChangepasswordHandle = async (e) =>{ 
    e.preventDefault()
    await axios.post("http://localhost:8005/api/auth/changepassword",formData)
  console.log(formData);
navigate("/")
 
}

const handleChange = (e:any) =>{
    setFormData({...formData,[e.target.name]:e.target.value}) 
    setShow({...formData,[e.target.name]:e.target.value}) 
    console.log(show);
    
}

  return (
    <div  style={{height:"100vh",backgroundColor:"rgb(163, 163, 73)"}}>
            <Link to="/login"> <i className="fa-solid fa-backward mt-5" >Back to Login Page</i></Link>
       <div>
      <form className='container' onSubmit={ChangepasswordHandle} autoComplete="off">
        <input type="email" name='email' className='form-control mb-3'  value={show?.email} disabled 
      
        placeholder='Email'/>
          <input type="password" name="password" placeholder='Password' onChange={handleChange}/>
                 
          <input type="text" name="code" placeholder='OTP' onChange={handleChange}/>
          
          <button type='submit' className='btn btn-danger d-flex align-items-center'>Change Password</button>
        </form>
    </div>
    </div>
  )
}

export default ChangePassword