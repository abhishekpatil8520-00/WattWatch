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
      
      {/* Background Parallax Elements */}
      <motion.div className="parallax-bg-elements" style={{ y: yBackground }}>
        <div className="svg-blob blob-1">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(16, 185, 129, 0.1)" d="M47.7,-57.2C59.4,-47.3,64.8,-29.4,66.5,-12.3C68.2,4.8,66.1,21,57.1,33.5C48.1,46,32.2,54.7,14.6,60.1C-3,65.5,-22.3,67.6,-38.3,61C-54.3,54.4,-67,39.1,-72.1,21.5C-77.2,3.9,-74.7,-16,-65.4,-32.1C-56.1,-48.2,-40.1,-60.5,-23.5,-64.1C-6.9,-67.7,10.3,-62.7,26.5,-57.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="svg-blob blob-2">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(59, 130, 246, 0.1)" d="M54.8,-63.9C71.3,-52.4,85,-35.1,88.7,-15.8C92.4,3.5,86,24.8,73.4,41.9C60.8,59,42,71.9,21.1,77.5C0.2,83.1,-22.8,81.4,-41.8,71.7C-60.8,62,-75.8,44.3,-82.1,23.8C-88.4,3.3,-86,-20.1,-75.4,-38.7C-64.8,-57.3,-46,-71.1,-27.4,-77.1C-8.8,-83.1,9.6,-81.3,27.5,-73.9Z" transform="translate(100 100)" />
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
