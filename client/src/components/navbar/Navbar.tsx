import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
const {user}=useContext(AuthContext);
console.log(user?.result?.img)
const logout =()=>{

  localStorage.clear();
  window.location.href = '/';
}

  return (
    <div className="navbar">
          

      <div className="navContainer">
       {user ?  `${user?.result?.googleId ?user?.result?.username:user.username}`:<Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hotel booking</span>
        </Link>}
        <img src={user  && `${user?.result?.googleId ?user?.result?.img:user.img}`}/>
      <div className="move">
        {user ? `${user?.result?.phone ?user?.result?.username:user.username}` &&<LogoutIcon onClick={() => {
    const confirmBox = window.confirm(
      "Do you really want to logout"
    )
    if (confirmBox === true) {
     logout();
    }
  }} className="icon" /> : (
          <div className="navItems">
           <Link to ="/register">
            <button className="navButton">Register</button>
            </Link>

            <Link to ="/login">
            <button className="navLogin">Login</button>
            </Link>
         
          </div>
          
        )}
        </div>

      
        
      </div>
    </div>
  );
};

export default Navbar;