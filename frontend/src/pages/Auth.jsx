import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignIn, setIsSignIn] = useState(location.pathname !== '/signup');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsSignIn(location.pathname !== '/signup');
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:10000';
      const endpoint = isSignIn ? '/api/v1/auth/signin' : '/api/v1/auth/signup';
      const bodyPayload = isSignIn ? { email, password } : { name, email, password };

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPayload),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || (isSignIn ? 'Sign in failed' : 'Registration failed'));
      }
      
      localStorage.setItem('wattwatch_token', data.access_token);
      localStorage.setItem('wattwatch_user', JSON.stringify(data.user));
      
      setSuccess(isSignIn ? 'Sign in successful!' : 'Registration successful!');
      setTimeout(() => navigate('/dashboard'), 1000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setError('');
    setSuccess('');
    if (isSignIn) {
      navigate('/signup');
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className="auth-split-wrapper">
      <div className="auth-split-card glass">
        
        {/* FORM PANEL (Slides Right when Sign Up) */}
        <motion.div 
          className="split-form-panel"
          initial={false}
          animate={{ x: isSignIn ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="auth-header">
            <h2>{isSignIn ? 'Welcome Back' : 'Create Account'}</h2>
            <p>{isSignIn ? 'Sign in to access your dashboard' : 'Register to monitor smart grids'}</p>
          </div>
          
          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          
          {success && (
            <div className="auth-success">
              <CheckCircle2 size={16} />
              {success}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.form 
              key={isSignIn ? 'signin' : 'signup'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit} 
              className="auth-form"
            >
              {!isSignIn && (
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input 
                      type="text" id="name" value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe" required={!isSignIn} 
                    />
                  </div>
                </div>
              )}
              
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input 
                    type="email" id="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com" required 
                  />
                </div>
              </div>
              
              <div className="input-group">
                <div className="password-label-group">
                  <label htmlFor="password">Password</label>
                  {isSignIn && <Link to="#" className="forgot-password">Forgot?</Link>}
                </div>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input 
                    type="password" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignIn ? "Your password" : "Create a password"} required 
                  />
                </div>
              </div>
              
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (isSignIn ? 'Signing In...' : 'Creating Account...') : (
                  <>{isSignIn ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} /></>
                )}
              </button>

              {/* Mobile toggle text (only visible on small screens) */}
              <p className="mobile-toggle-text">
                {isSignIn ? "Don't have an account? " : "Already have an account? "}
                <span onClick={toggleMode} className="toggle-link">
                  {isSignIn ? "Sign Up" : "Sign In"}
                </span>
              </p>
            </motion.form>
          </AnimatePresence>
        </motion.div>

        {/* VISUAL PANEL (Slides Left when Sign Up) */}
        <motion.div 
          className="split-visual-panel"
          initial={false}
          animate={{ x: isSignIn ? "0%" : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="visual-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignIn ? 'signin-visual' : 'signup-visual'}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="visual-svg-container"
              >
                {isSignIn ? (
                  /* Abstract SVG for Sign In */
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[250px]">
                    <motion.circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4"
                      animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
                    <motion.circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeDasharray="15,10"
                      animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
                    <path d="M70 100 L95 125 L140 75" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  /* Abstract SVG for Sign Up */
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[250px]">
                    <motion.rect x="40" y="40" width="120" height="120" rx="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4"
                      animate={{ rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                    <motion.circle cx="100" cy="100" r="30" fill="white"
                      animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <circle cx="100" cy="40" r="8" fill="white" />
                    <circle cx="160" cy="100" r="8" fill="white" />
                    <circle cx="100" cy="160" r="8" fill="white" />
                    <circle cx="40" cy="100" r="8" fill="white" />
                  </svg>
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="visual-text">
              <h3>{isSignIn ? "New to WattWatch?" : "Already with us?"}</h3>
              <p>{isSignIn ? "Sign up to start monitoring your infrastructure today." : "Log back in to keep track of your analytics."}</p>
              <button className="toggle-btn-outline" onClick={toggleMode} type="button">
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Auth;
