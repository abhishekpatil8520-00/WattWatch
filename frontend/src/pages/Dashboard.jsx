import React, { useEffect, useState } from 'react';
import { Activity, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [telemetry, setTelemetry] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [kpis, setKpis] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    energy: 0
  });

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:10000';
        const res = await fetch(`${apiUrl}/api/v1/telemetry`);
        const json = await res.json();
        
        if (json.status === 'success' && json.data.length > 0) {
          // Data is ordered desc by timestamp, reverse it for the chart
          const chartData = [...json.data].reverse().map(d => ({
            ...d,
            time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            voltage: parseFloat(d.voltage).toFixed(1),
            power: parseFloat(d.power).toFixed(2),
            current: parseFloat(d.current).toFixed(1)
          }));
          
          setTelemetry(chartData);
          
          const latest = json.data[0];
          setKpis({
            voltage: latest.voltage.toFixed(1),
            current: latest.current.toFixed(1),
            power: latest.power.toFixed(2),
            energy: latest.energy.toFixed(1)
          });
          
          const recentAnomalies = json.data.filter(d => d.is_anomaly).slice(0, 5);
          setAnomalies(recentAnomalies);
        }
      } catch (err) {
        console.error("Failed to fetch telemetry:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTelemetry();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchTelemetry, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Overview</h1>
          <p>Loading Telemetry...</p>
        </div>
        <div className="stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-card skeleton-bg">
              <div className="skeleton-text large skeleton-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Grid Overview</h1>
        <p>Live Smart Grid Telemetry</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <Zap size={20} className="stat-icon" style={{ color: 'var(--primary)' }} />
            <span>Latest Power</span>
          </div>
          <div className="stat-value">{kpis.power} kW</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <Activity size={20} className="stat-icon" style={{ color: 'var(--success)' }} />
            <span>Voltage</span>
          </div>
          <div className="stat-value">{kpis.voltage} V</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <Cpu size={20} className="stat-icon" style={{ color: 'var(--accent)' }} />
            <span>Current</span>
          </div>
          <div className="stat-value">{kpis.current} A</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <ShieldAlert size={20} className="stat-icon" style={{ color: 'var(--error)' }} />
            <span>Active Anomalies</span>
          </div>
          <div className="stat-value">{anomalies.length > 0 ? anomalies.length : '0'}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card main-chart">
          <div className="chart-header">
            <h3>Power & Voltage Trend</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={telemetry} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                <YAxis yAxisId="left" stroke="#3b82f6" fontSize={12} domain={['auto', 'auto']} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="power" name="Power (kW)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="voltage" name="Voltage (V)" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-card side-chart">
          <div className="chart-header">
            <h3>Recent Anomalies</h3>
          </div>
          <div className="anomaly-list">
            {anomalies.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>No recent anomalies detected.</p>
            ) : (
              anomalies.map((anomaly, idx) => (
                <div key={idx} className="anomaly-item">
                  <ShieldAlert size={16} className="anomaly-icon" />
                  <div className="anomaly-details">
                    <span className="anomaly-time">{new Date(anomaly.timestamp).toLocaleTimeString()}</span>
                    <span className="anomaly-score">Score: {(anomaly.anomaly_score * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
