import React from "react";
import { IoMdFitness } from "react-icons/io";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            Exercise <IoMdFitness />
          </h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>Welcome: {user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
