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
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
                stroke="var(--primary)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="rgba(16, 185, 129, 0.2)"
                animate={{ fillOpacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>
          <span className="logo-text">
            {"WattWatch".split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5, type: "spring" }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
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
