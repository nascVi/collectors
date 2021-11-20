import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const DynamicSignup = ({isLoggedIn}) => {
  const {pathname} = useLocation() // endpoint of the request
  const navigate = useNavigate() 

  const handleSignout = () => {
    localStorage.clear()
    navigate.push('/') //redirects back to homepage
  }
  if (isLoggedIn) {
    return (
    <>
      <li className={pathname==="/create"? "active": ""}><Link to="/create"><span className="glyphicon glyphicon-pencil"></span> New Blog</Link></li>
      <li className={pathname==="/signout"? "active": ""} onClick={handleSignout}><Link to="/signout"><span className="glyphicon glyphicon-log-in"></span> Signout</Link></li>
    </>)
  } else {
      return <>
        <li className={pathname==="/signup"? "active": ""}><Link to="/signup"><span className="glyphicon glyphicon-user"></span>Signup</Link></li>
        <li className={pathname==="/signin"? "active": ""}><Link to="/signin"><span className="glyphicon glyphicon-log-in"></span> Signin</Link></li>
      </>
  }
}

function Nav () {
  const {pathname} = useLocation()
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="#">The Collectors Blog</Link>
        </div>
        <ul style={{display:'inline'}} className="nav navbar-nav">
          <li className={pathname==="/"? "active": ""}><Link to="/">Home</Link></li>
          <li className={pathname==="/blogs"? "active": ""}><Link to="/blogs">Blogs</Link></li>
        </ul>
        <ul style={{display:'inline'}} className="nav navbar-nav navbar-right">
          <DynamicSignup isLoggedIn={localStorage.getItem('userId')? true: false} />
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
