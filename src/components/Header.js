import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src="/logo.png" className='logo' alt="SJ Innovation logo" />
      </Link>
    </header>
  );
}

export default Header;