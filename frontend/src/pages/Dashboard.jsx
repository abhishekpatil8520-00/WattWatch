import React, { useEffect, useState } from 'react';
import { Activity, Zap, ShieldAlert, Cpu } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading state for the skeleton effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="development-overlay">
        <div className="overlay-content">
          <Cpu className="overlay-icon pulse" size={48} />
          <h2>Dashboard Under Development</h2>
          <p>We're building powerful analytics to monitor your smart grids.</p>
          <div className="status-badge">
            <span className="dot pulse"></span>
            System Initialization in Progress
          </div>
        </div>
      </div>

      <div className="dashboard-header">
        <h1>Overview</h1>
        <p>Smart Grid Telemetry</p>
      </div>

      <div className="stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-card skeleton-bg">
            <div className="stat-header">
              <div className="skeleton-icon skeleton-pulse"></div>
              <div className="skeleton-text short skeleton-pulse"></div>
            </div>
            <div className="skeleton-text large skeleton-pulse"></div>
            <div className="skeleton-text medium skeleton-pulse"></div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card main-chart skeleton-bg">
          <div className="chart-header">
            <div className="skeleton-text short skeleton-pulse"></div>
            <div className="skeleton-text skeleton-pulse" style={{ width: '120px' }}></div>
          </div>
          <div className="skeleton-chart-area skeleton-pulse"></div>
        </div>
        
        <div className="chart-card side-chart skeleton-bg">
          <div className="chart-header">
            <div className="skeleton-text short skeleton-pulse"></div>
          </div>
          <div className="skeleton-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton-list-item">
                <div className="skeleton-icon small skeleton-pulse"></div>
                <div className="skeleton-text skeleton-pulse" style={{ width: '60%' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
