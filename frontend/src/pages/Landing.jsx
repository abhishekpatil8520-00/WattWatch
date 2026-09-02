import React, { useRef } from 'react';
import { Zap, Shield, Activity, ArrowRight, Server, Hexagon, Lightbulb, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Landing.css';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    }
  }
};

const wordVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, filter: "brightness(0)" },
  visible: (i) => ({
    opacity: [0, 1, 0, 1, 0.5, 1, 1, 0, 1, 1],
    filter: [
      "brightness(0)",
      "brightness(3)",
      "brightness(0)",
      "brightness(3)",
      "brightness(1.5)",
      "brightness(1)",
      "brightness(1)",
      "brightness(0.2)",
      "brightness(1.5)",
      "brightness(1)"
    ],
    textShadow: [
      "none",
      "0 0 20px #10B981, 0 0 40px #10B981",
      "none",
      "0 0 20px #10B981, 0 0 40px #10B981",
      "0 0 10px #10B981",
      "0 0 15px #10B981",
      "0 0 15px #10B981",
      "none",
      "0 0 15px #10B981",
      "0 0 15px #10B981"
    ],
    transition: {
      duration: 3 + (i % 4),
      repeat: Infinity,
      repeatType: "loop",
      times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.8, 0.82, 0.85, 1]
    }
  })
};

const Landing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
          style={{ y: yText }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="hero-title"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span variants={wordVariants} style={{display: 'inline-block'}}>
              {"Intelligent".split("").map((char, index) => (
                <motion.span 
                  key={`p1-${index}`} 
                  custom={index}
                  style={{display: 'inline-block'}}
                  variants={letterVariants}
                >
                  {char}
                </motion.span>
              ))}

              <motion.span 
                style={{display: 'inline-block', verticalAlign: 'middle', margin: '0 12px'}}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                }}
              >
                <motion.div
                  animate={{ rotate: [-8, 8, -8], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Leaf className="text-emerald-500" size={54} color="#10B981" />
                </motion.div>
              </motion.span>
            </motion.span>
            <br />
            <motion.span variants={wordVariants} className="text-emerald" style={{display: 'inline-block', color: '#059669'}}>
              {"Energy".split("").map((char, index) => (
                <motion.span 
                  key={`p2-${index}`} 
                  custom={index + 10}
                  style={{display: 'inline-block'}}
                  variants={letterVariants}
                >
                  {char}
                </motion.span>
              ))}
              <br />
              {"Monitoring".split("").map((char, index) => (
                <motion.span 
                  key={`p3-${index}`} 
                  custom={index + 20}
                  style={{display: 'inline-block'}}
                  variants={letterVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          
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
          {/* Contextual Smart Grid SVG Illustration */}
          <div className="hero-svg-illustration">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[500px]">
              {/* Central Hub */}
              <motion.g className="cyber-bulb-glow" style={{ transformOrigin: "200px 200px" }}>
                <circle 
                  cx="200" cy="200" r="45" 
                  fill="var(--bg-card)" stroke="var(--primary)" strokeWidth="4"
                />
                <Lightbulb x="176" y="176" size={48} className="text-primary" />
              </motion.g>
              
              {/* Radiating Pulses */}
              <motion.circle 
                cx="200" cy="200" r="45" fill="none" stroke="var(--primary)" strokeWidth="2"
                animate={{ r: [45, 90], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Data Lines & Nodes */}
              <g stroke="var(--border-color)" strokeWidth="2" strokeDasharray="5,5">
                <line x1="200" y1="155" x2="200" y2="80" />
                <line x1="200" y1="245" x2="200" y2="320" />
                <line x1="155" y1="200" x2="80" y2="200" />
                <line x1="245" y1="200" x2="320" y2="200" />
                <line x1="168" y1="168" x2="110" y2="110" />
                <line x1="232" y1="232" x2="290" y2="290" />
              </g>

              {/* Node Icons */}
              <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <circle cx="200" cy="70" r="20" fill="var(--bg-secondary)" stroke="var(--text-secondary)" strokeWidth="2" />
                <Activity x="190" y="60" size={20} className="text-warning" />
              </motion.g>

              <motion.g animate={{ y: [0, 5, 0] }} transition={{ duration: 3.2, repeat: Infinity, delay: 0.5 }}>
                <circle cx="200" cy="330" r="20" fill="var(--bg-secondary)" stroke="var(--text-secondary)" strokeWidth="2" />
                <Server x="190" y="320" size={20} className="text-blue" />
              </motion.g>

              <motion.g animate={{ x: [0, -5, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}>
                <circle cx="70" cy="200" r="20" fill="var(--bg-secondary)" stroke="var(--text-secondary)" strokeWidth="2" />
                <Shield x="60" y="190" size={20} className="text-primary" />
              </motion.g>

              <motion.g animate={{ x: [0, 5, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}>
                <circle cx="330" cy="200" r="20" fill="var(--bg-secondary)" stroke="var(--text-secondary)" strokeWidth="2" />
                <Hexagon x="320" y="190" size={20} className="text-primary" />
              </motion.g>
              
              {/* Floating Data Packets */}
              <motion.circle cx="200" cy="155" r="4" fill="var(--primary)"
                animate={{ cy: [155, 80], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.circle cx="200" cy="245" r="4" fill="var(--blue)"
                animate={{ cy: [245, 320], opacity: [1, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }} />
              <motion.circle cx="155" cy="200" r="4" fill="var(--warning)"
                animate={{ cx: [155, 80], opacity: [1, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: 1 }} />
              <motion.circle cx="245" cy="200" r="4" fill="var(--primary)"
                animate={{ cx: [245, 320], opacity: [1, 0] }} transition={{ duration: 1.7, repeat: Infinity, delay: 0.2 }} />
            </svg>
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
      
    </div>
  );
};

export default Landing;
