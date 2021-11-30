import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

const Header = ({ carId }) => {
  const [showNav, setShowNav] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      <header>
        <article className="header-article">
          <nav
            className="header-navigation"
            style={{ width: showNav ? 250 : 0 }}
          >
            <h1>Menu</h1>
            <Link to="/">Home</Link>
            <Link to="/login">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
            <Link to="/profile">
              <i className="fas fa-user"></i> Profile
            </Link>
            <Link to="/post-car">
              <i className="fas fa-plus"></i> Post a car
            </Link>
            <Link to="/my-cars">
              <i className="fas fa-car"></i> My Cars
            </Link>
            <button
              className="header-navigation-closeBtn"
              onClick={() => setShowNav(false)}
            >
              &times;
            </button>
          </nav>

          {pathname === `/car/${carId}` ? (
            <button className="header-article-menu">
              <Link className="header-article-back" to="/">
                <i className="fas fa-arrow-left"></i>
              </Link>
            </button>
          ) : (
            <button
              className="header-article-menu"
              onClick={() => setShowNav(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
          )}

          <Link to="/">
            <h1 className="header-article-logo">CARS.com</h1>
          </Link>
        </article>
      </header>
    </>
  );
};

export default Header;
