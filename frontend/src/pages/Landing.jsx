import React from 'react';
import { Zap } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="glow-orb"></div>
      <div className="glass-card">
        <div className="logo-container">
          <Zap size={32} />
        </div>
        <h1>WattWatch</h1>
        <p className="subtitle">Smart Grid Monitoring & Anomaly Detection</p>
        
        <div className="status-badge">
          <span className="dot pulse"></span>
          Under Active Development
        </div>
        
        <p className="description">
          We are currently building a powerful, explainable decision-support tool to monitor smart grids, detect anomalies, and prevent energy theft.
        </p>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <span className="progress-text">System Initialization...</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
