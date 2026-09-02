import React from 'react';
import { Zap, Globe, Mail, MessageSquare } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="global-footer glass">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <Zap className="text-primary" size={20} />
            <span>WattWatch</span>
          </div>
          <p className="footer-desc">
            Advanced decision-support for smart grids. <br/>
            Monitor, detect, and protect.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Website"><Globe size={18} /></a>
            <a href="#" aria-label="Twitter"><MessageSquare size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Mail size={18} /></a>
          </div>
        </div>
        
        <div className="footer-links-group">
          <div className="footer-column">
            <h4>Platform</h4>
            <a href="#">Dashboard</a>
            <a href="#">API</a>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">Contact</a>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} WattWatch Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
