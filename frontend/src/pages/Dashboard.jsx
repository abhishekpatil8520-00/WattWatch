import React, { useState, useEffect } from 'react';
import { 
  Zap, Activity, ShieldAlert, Cpu, 
  Map as MapIcon, BatteryCharging, 
  ArrowUpRight, AlertTriangle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { motion } from 'framer-motion';
import './Dashboard.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  
  // Synthetic Data for future showcase
  const syntheticTelemetry = Array.from({ length: 24 }).map((_, i) => ({
    time: `${i}:00`,
    power: Math.floor(Math.random() * 40) + 120, // 120 - 160 kW
    voltage: 230 + (Math.random() * 10 - 5), // ~230V
    load: Math.floor(Math.random() * 30) + 60, // 60 - 90%
  }));

  const syntheticAnomalies = [
    { id: 1, type: "Voltage Sag", severity: "high", time: "10 mins ago", location: "Zone Alpha" },
    { id: 2, type: "Unusual Load", severity: "medium", time: "1 hr ago", location: "Zone Beta" },
    { id: 3, type: "Phase Imbalance", severity: "low", time: "3 hrs ago", location: "Substation 4" },
  ];

  const syntheticGridStatus = [
    { label: "Alpha", value: 98, color: "var(--success)" },
    { label: "Beta", value: 76, color: "var(--warning)" },
    { label: "Gamma", value: 99, color: "var(--success)" },
    { label: "Delta", value: 45, color: "var(--error)" },
  ];

  useEffect(() => {
    // Simulate loading for realistic feel
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <div className="loading-state">
          <div className="dot pulse" style={{backgroundColor: 'var(--primary)'}}></div>
          <p style={{color: 'var(--text-primary)'}}>Initializing Neural Monitors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div>
          <h1 className="text-gradient">Grid Command Center</h1>
          <p className="text-muted">Live telemetry and predictive analytics</p>
        </div>
        <div className="header-actions">
          <div className="status-indicator">
            <span className="dot pulse" style={{backgroundColor: 'var(--success)'}}></span>
            System Online
          </div>
        </div>
      </header>

      <motion.div 
        className="bento-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Top KPIs */}
        <motion.div variants={itemVariants} className="bento-card glass col-span-1 hover-lift">
          <div className="card-header">
            <Zap className="text-emerald" size={20} />
            <h3>Total Load</h3>
          </div>
          <div className="card-body">
            <div className="metric-large">142.5 <span className="unit">kW</span></div>
            <div className="metric-trend positive">
              <ArrowUpRight size={16} /> 2.4% vs last hour
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bento-card glass col-span-1 hover-lift">
          <div className="card-header">
            <Activity className="text-blue" size={20} />
            <h3>Avg Voltage</h3>
          </div>
          <div className="card-body">
            <div className="metric-large">231.2 <span className="unit">V</span></div>
            <div className="metric-trend neutral">Stable across 98% of nodes</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bento-card glass col-span-1 hover-lift">
          <div className="card-header">
            <BatteryCharging className="text-warning" size={20} />
            <h3>Storage</h3>
          </div>
          <div className="card-body">
            <div className="metric-large">84 <span className="unit">%</span></div>
            <div className="metric-trend positive">Discharging at 12kW</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bento-card glass col-span-1 highlight-border hover-lift alert-card">
          <div className="card-header">
            <ShieldAlert className="text-error" size={20} />
            <h3>Threat Level</h3>
          </div>
          <div className="card-body position-relative">
            <div className="metric-large text-error">Elevated</div>
            <div className="metric-trend negative">3 anomalies detected</div>
            
            {/* Animated SVG background for alerts */}
            <svg className="alert-pulse-svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="rgba(244, 63, 94, 0.1)" />
              <circle cx="50" cy="50" r="30" fill="rgba(244, 63, 94, 0.2)" />
            </svg>
          </div>
        </motion.div>

        {/* Main Chart */}
        <motion.div variants={itemVariants} className="bento-card glass col-span-3 row-span-2">
          <div className="card-header">
            <h3>Power Consumption Forecast</h3>
            <span className="badge badge-light">AI Prediction</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={syntheticTelemetry} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="power" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorPower)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Anomalies List */}
        <motion.div variants={itemVariants} className="bento-card glass col-span-1 row-span-2">
          <div className="card-header">
            <h3>Active Anomalies</h3>
          </div>
          <div className="anomaly-list">
            {syntheticAnomalies.map(anomaly => (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                key={anomaly.id} 
                className={`anomaly-item severity-${anomaly.severity}`}
              >
                <div className="anomaly-icon-wrap">
                  <AlertTriangle size={16} />
                </div>
                <div className="anomaly-info">
                  <h4>{anomaly.type}</h4>
                  <p>{anomaly.location} • {anomaly.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="btn-full-width mt-4 btn-light">View All Logs</button>
        </motion.div>

        {/* Secondary Charts / Maps */}
        <motion.div variants={itemVariants} className="bento-card glass col-span-2 hover-lift">
          <div className="card-header">
            <MapIcon className="text-muted" size={20} />
            <h3>Zone Health Status</h3>
          </div>
          <div className="zone-grid">
            {syntheticGridStatus.map(zone => (
              <div key={zone.label} className="zone-bar-wrapper">
                <div className="zone-label">
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{zone.label}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{zone.value}%</span>
                </div>
                <div className="zone-bar-bg light-bg">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${zone.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="zone-bar-fill" 
                    style={{ backgroundColor: zone.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bento-card glass col-span-2 hover-lift">
          <div className="card-header">
            <Cpu className="text-accent" size={20} />
            <h3>Model Confidence</h3>
          </div>
          <div className="chart-container" style={{height: '140px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={syntheticTelemetry.slice(0, 10)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Tooltip cursor={{fill: 'var(--border-light)'}} contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="load" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Dashboard;
