import React from 'react';
import { GitBranch, MessageSquare, Briefcase } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo-text">WattWatch</span>
            <p className="footer-tagline">Intelligent Smart Grid Monitoring</p>
          </div>
          
          <div className="footer-devs">
            <h4>Built by</h4>
            <div className="dev-team">
              <a href="https://github.com/abhishekpatil8520-00" target="_blank" rel="noreferrer" className="dev-link">
                Abhishek Patil
              </a>
            </div>
          </div>
          
          <div className="footer-socials">
            <a href="https://github.com/abhishekpatil8520-00/WattWatch" target="_blank" rel="noreferrer" className="social-icon">
              <GitBranch size={20} />
            </a>
            <a href="#" className="social-icon">
              <MessageSquare size={20} />
            </a>
            <a href="#" className="social-icon">
              <Briefcase size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} WattWatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
