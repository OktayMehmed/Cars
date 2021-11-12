import React from "react";
import './styles.css';

const Header = () => {
  return (
  <header>
    <article className="header-article">
    <button className="header-article-menu"><i className="fas fa-bars"></i></button>
    <h1 className='header-article-logo'>CARS.com</h1>
    </article>
  </header>
  )
};

export default Header;
