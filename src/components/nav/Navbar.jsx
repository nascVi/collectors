import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const DynamicSignup = ({isLoggedIn}) => {
  const location = useLocation();
  const pathname = location.search; // endpoint of the request
  const history = useNavigate()

  const handleSignout = () => {
    localStorage.clear()
    history.push('/') //redirects back to homepage
  }
  if (isLoggedIn) {
    return (
    <>
      <li className={pathname==="/create"? "active": ""}><Link to="/create"><span className="glyphicon glyphicon-pencil"></span> New Blog</Link></li>
      <li className={pathname==="/signout"? "active": ""} onClick={handleSignout}><Link to="/signout"><span className="glyphicon glyphicon-log-in"></span> Signout</Link></li>
    </>)
  } else {
      return <>
        <li style={{display:'inline'}} className={pathname==="/signup"? "btn btn-outlined-primary active": ""}><Link to="/signup"><span className="glyphicon glyphicon-user"></span>Signup</Link></li>
        <li style={{display:'inline'}} className={pathname==="/signin"? "btn btn-outlined-primary active": ""}><Link to="/signin"><span className="glyphicon glyphicon-log-in"></span> Signin</Link></li>
      </>
  }
}

function Navbar () {
  const {pathname} = useLocation()
  return (
    <nav className="navbar navbar-dark bg-dark navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="#">The Collectors Blog</Link>
        </div>
        <ul style={{display:"inline"}} className="nav navbar-nav">
          <li style={{display:"inline"}} className={pathname==="/"? "btn btn-outlined-primary bg-light active": ""}><Link to="/">Home</Link></li>
          <li style={{display:"inline"}} className={pathname==="/blogs"? "btn btn-outlined-primary bg-light active": ""}><Link to="/blogs">Blogs</Link></li>
        </ul>
        <ul style={{display:'inline'}} className="navbar-nav navbar-right">
          <DynamicSignup isLoggedIn={localStorage.getItem('userId')? true: false} />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
