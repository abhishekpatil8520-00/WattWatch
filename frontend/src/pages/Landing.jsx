import React from 'react';
import { Zap, Shield, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="hero-content">
          <div className="badge-pill glass">
            <span className="dot pulse"></span>
            Smart Grid Platform 2.0
          </div>
          
          <h1 className="hero-title">
            Intelligent <span className="text-gradient">Energy Monitoring</span>
          </h1>
          
          <p className="hero-subtitle">
            Advanced decision-support tool for smart grids. Detect anomalies, prevent energy theft, and monitor infrastructure in real-time with our explainable platform.
          </p>
          
          <div className="hero-actions">
            <Link to="/dashboard" className="btn-primary">
              View Dashboard <ArrowRight size={18} />
            </Link>
            <Link to="/signup" className="btn-secondary glass">
              Create Account
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="bento-preview glass">
            <div className="bento-row">
              <div className="bento-cell highlight">
                <Activity size={24} className="cell-icon text-emerald" />
                <div className="cell-value">99.9%</div>
                <div className="cell-label">Uptime</div>
              </div>
              <div className="bento-cell">
                <Shield size={24} className="cell-icon text-blue" />
                <div className="cell-value">12</div>
                <div className="cell-label">Threats Blocked</div>
              </div>
            </div>
            <div className="bento-row main-chart-preview">
              <div className="chart-placeholder">
                <div className="bar" style={{height: '40%'}}></div>
                <div className="bar" style={{height: '70%'}}></div>
                <div className="bar" style={{height: '50%'}}></div>
                <div className="bar" style={{height: '90%'}}></div>
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar" style={{height: '100%'}}></div>
                <div className="bar" style={{height: '80%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
