import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, LogOut } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('wattwatch_token');
  const user = JSON.parse(localStorage.getItem('wattwatch_user') || 'null');
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleLogout = () => {
    localStorage.removeItem('wattwatch_token');
    localStorage.removeItem('wattwatch_user');
    navigate('/');
  };

  return (
    <motion.header 
      className={`global-header glass ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="header-container">
        <Link to="/" className="logo-link">
          <Zap className="logo-icon text-primary" size={24} />
          <span className="logo-text">WattWatch</span>
        </Link>
        
        <nav className="header-nav">
          {token ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <div className="user-menu">
                <span className="user-name">{user?.name || 'User'}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/signin" className="nav-link">Sign In</Link>
              <Link to="/signup" className="nav-button">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
