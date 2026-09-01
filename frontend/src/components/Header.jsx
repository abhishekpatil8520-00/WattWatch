import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand">
          <div className="brand-logo">
            <Zap size={20} />
          </div>
          <span className="brand-name">WattWatch</span>
        </Link>
        
        <nav className="header-nav">
          <Link to="/signin" className="nav-link">Log In</Link>
          <Link to="/signup" className="nav-btn">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
