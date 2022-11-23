import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';

const NavBar = () => {
  // const [user, setUSer] = useState(null);
  const navigate = useNavigate();
  const user = useSelector(state => {
    console.log(state);
    if (state.auth.login.currentUser) {
      return jwt(state.auth.login.currentUser.accessToken);
    }
    return null;
  });

  function logOut() {
    user = null;
  }

  return (
    <nav className="navbar-container">
      {console.log(user)}
      <Link to="/" className="navbar-home"> Home </Link>
      {user !== null ? (
        <>
          <p className="navbar-user">Hi, <span> {user && user.name}  </span> </p>
          <Link to="/" className="navbar-logout" onClick={logOut}> Log out</Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login" > Login </Link>
          <Link to="/register" className="navbar-register"> Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
