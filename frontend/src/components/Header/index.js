import React, { useState } from "react";
import "./styles.css";

const Header = () => {
  const [showNav, setShowNav] = useState(false)

  return (
    <>
      <header>
        <article className="header-article">
          <nav className='header-navigation' style={{ width: showNav ? 250 : 0 }}>
          <h1>Menu</h1>
          <a href="#">Home</a>
          <a href="#">Login</a>
          <a href="#"><i class="fas fa-plus"></i> Post a car</a>
          <button className="header-navigation-closeBtn" onClick={() => setShowNav(false)}>&times;</button>
          </nav>
          <button className="header-article-menu" onClick={() => setShowNav(true)}>
            <i className="fas fa-bars"></i>
          </button>
          <h1 className="header-article-logo">CARS.com</h1>
        </article>
      </header>
    </>
  );
};

export default Header;
