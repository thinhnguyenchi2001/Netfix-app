import "./navbar.scss";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchAppBar from "../SearchAppBar";
import ScrollDialog from "../Dialog";
import ResponsiveAppBar from "../Avtar";
import AccountMenu from "../Menu";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state) => state.app.user);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
          <span>
            <Link to="/">Home</Link>
          </span>

          <span>
            <Link to="/movies">Movies</Link>
          </span>
          <span>
            <Link to="/tv">TV Shows</Link>
          </span>
          {user && (
            <span>
              <Link to="/favorite">Favorite list</Link>
            </span>
          )}
          {user && (
            <span>
              <Link to="/watch">Watch List</Link>
            </span>
          )}
        </div>
        <div className="right">
          <SearchAppBar />

          {user ? (
            <div className="avatar">
              {" "}
              <ResponsiveAppBar />
            </div>
          ) : (
            <>
              <div className="get-start">
                <Link to="/register">Get Started</Link>
              </div>
            </>
          )}
          <div className="menu-icon">
            <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
