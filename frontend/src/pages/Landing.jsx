import React, { useRef } from 'react';
import { Zap, Shield, Activity, ArrowRight, Server, Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import './Landing.css';

const Landing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="landing-container" ref={containerRef}>
      
      {/* Animated Grid SVG Background */}
      <motion.div className="parallax-bg-elements" style={{ y: yBackground }}>
        <div className="svg-grid-container">
          <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="energy-grid-svg">
            <g className="grid-lines" stroke="var(--primary)" strokeWidth="1" strokeOpacity="0.15" fill="none">
              <motion.path 
                d="M 100 500 L 300 300 L 500 400 L 700 200" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              />
              <motion.path 
                d="M 100 200 L 300 400 L 600 300 L 700 500" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity, delay: 1 }}
              />
              <motion.path 
                d="M 200 100 L 400 350 L 500 250 L 650 450" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4.5, ease: "linear", repeat: Infinity, delay: 0.5 }}
                stroke="var(--accent)"
                strokeOpacity="0.2"
              />
            </g>
            
            <g className="grid-nodes">
              <motion.circle cx="300" cy="300" r="4" fill="var(--primary)" 
                animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.circle cx="500" cy="400" r="6" fill="var(--accent)" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
              <motion.circle cx="300" cy="400" r="5" fill="var(--warning)" 
                animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
              <motion.circle cx="600" cy="300" r="4" fill="var(--primary)" 
                animate={{ scale: [1, 2, 1], opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 1.8, repeat: Infinity, delay: 1.5 }} />
            </g>
          </svg>
        </div>
      </motion.div>

      <div className="landing-hero">
        <motion.div 
          className="hero-content"
          style={{ y: yText, opacity: opacityText }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="badge-pill glass">
            <span className="dot pulse"></span>
            Smart Grid Platform 2.0
          </div>
          
          <h1 className="hero-title">
            Intelligent <span className="text-gradient">Energy Monitoring</span>
          </h1>
          
          <p className="hero-subtitle">
            Advanced decision-support tool for smart grids. Detect anomalies, prevent energy theft, and monitor infrastructure in real-time with our beautiful, explainable platform.
          </p>
          
          <div className="hero-actions">
            <Link to="/dashboard" className="btn-primary">
              View Dashboard <ArrowRight size={18} />
            </Link>
            <Link to="/signup" className="btn-secondary glass">
              Create Account
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Spline 3D Object Scene */}
          <div className="spline-wrapper">
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
          </div>

          <div className="floating-elements">
            <motion.div 
              className="float-card card-1 glass"
              animate={{ y: [0, -15, 0], rotate: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <Activity className="text-emerald" size={24} />
              <span>99.9% Uptime</span>
            </motion.div>
            
            <motion.div 
              className="float-card card-2 glass"
              animate={{ y: [0, 20, 0], rotate: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <Shield className="text-blue" size={24} />
              <span>Secure Grid</span>
            </motion.div>

            <motion.div 
              className="float-card card-3 glass"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 2 }}
            >
              <Hexagon className="text-warning spinning-icon" size={24} />
              <span>AI Analysis</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
