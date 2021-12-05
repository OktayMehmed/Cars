import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/User";
import "./styles.css";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const carsDetails = useSelector((state) => state.carsDetails);
  const { car, error: carError } = carsDetails;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <header>
        <article className="header-article">
          <nav
            className="header-navigation"
            style={{ width: showNav ? 250 : 0 }}
          >
            <h1 className="header-menu">Menu</h1>
            {userInfo && (
              <p className="header-username">Hello, {userInfo.name}</p>
            )}
            <Link to="/">Home</Link>
            {userInfo ? (
              <>
                <Link to="/" onClick={logoutHandler}>
                  <i className="fas fa-sign-out-alt"></i> Logout
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
              </>
            ) : (
              <Link to="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            )}

            <button
              className="header-navigation-closeBtn"
              onClick={() => setShowNav(false)}
            >
              &times;
            </button>
          </nav>

          {carError || pathname === `/car/${car._id}` ? (
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
