import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0
      };
    }
  };

  const direction = isSignIn ? -1 : 1;

  const toggleAuthMode = (mode) => {
    setError('');
    setSuccess('');
    if (mode === 'signin' && !isSignIn) {
      navigate('/signin');
    } else if (mode === 'signup' && isSignIn) {
      navigate('/signup');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isSignIn ? 'Welcome Back' : 'Create an Account'}</h2>
          <p>{isSignIn ? 'Sign in to monitor your grid telemetry' : 'Join WattWatch to monitor your smart grids'}</p>
        </div>

        {/* Sliding Toggle */}
        <div className="auth-toggle-slider">
          <div 
            className="toggle-option" 
            onClick={() => toggleAuthMode('signin')}
            style={{ color: isSignIn ? 'var(--text-primary)' : 'var(--text-muted)' }}
          >
            Sign In
          </div>
          <div 
            className="toggle-option" 
            onClick={() => toggleAuthMode('signup')}
            style={{ color: !isSignIn ? 'var(--text-primary)' : 'var(--text-muted)' }}
          >
            Sign Up
          </div>
          <motion.div 
            className="toggle-highlighter"
            initial={false}
            animate={{ x: isSignIn ? '0%' : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
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
        
        <div className="auth-form-container">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.form 
              key={isSignIn ? 'signin' : 'signup'}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              onSubmit={handleSubmit} 
              className="auth-form"
            >
              
              {!isSignIn && (
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={18} />
                    <input 
                      type="text" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe" 
                      required={!isSignIn} 
                    />
                  </div>
                </div>
              )}
              
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com" 
                    required 
                  />
                </div>
              </div>
              
              <div className="input-group">
                <div className="password-label-group">
                  <label htmlFor="password">Password</label>
                  {isSignIn && <a href="#" className="forgot-password">Forgot password?</a>}
                </div>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignIn ? "Enter your password" : "Create a strong password"} 
                    required 
                  />
                </div>
              </div>
              
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (isSignIn ? 'Signing In...' : 'Creating Account...') : (
                  <>{isSignIn ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>
                )}
              </button>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
