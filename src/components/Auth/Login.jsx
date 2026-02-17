import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import ThemeToggle from '../ThemeToggle';
import { storage } from '../../utils/storage';

const VALID_CREDENTIALS = {
  email: 'intern@demo.com',
  password: 'intern123'
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      storage.setUser({ email }, rememberMe);
      navigate('/board');
    } else {
      setErrors({ form: 'Invalid email or password' });
    }
  };

  return (
    <div style={{ ...styles.container, backgroundColor: colors.background }}>
      <div style={{ 
        ...styles.card, 
        backgroundColor: colors.surface,
        boxShadow: `0 10px 40px ${colors.shadowLarge}`,
        padding: isMobile ? '2rem' : '3rem',
        maxWidth: isMobile ? '90%' : '450px'
      }}>
        <div style={styles.headerContainer}>
          <h1 style={{ ...styles.title, color: colors.text }}>Task Board Login</h1>
          <ThemeToggle />
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                ...styles.input, 
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text
              }}
              placeholder="intern@demo.com"
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                ...styles.input, 
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text
              }}
              placeholder="Enter password"
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          <div style={styles.checkboxField}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              id="rememberMe"
            />
            <label htmlFor="rememberMe" style={{ ...styles.checkboxLabel, color: colors.textSecondary }}>Remember Me</label>
          </div>

          {errors.form && <div style={{ ...styles.formError, backgroundColor: colors.danger + '20', color: colors.danger }}>{errors.form}</div>}

          <button type="submit" style={{ ...styles.button, backgroundColor: colors.primary }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '1rem'
  },
  card: {
    borderRadius: '16px',
    width: '100%'
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: '600',
    fontSize: '1.05rem'
  },
  input: {
    padding: '1rem',
    border: '2px solid',
    borderRadius: '8px',
    fontSize: '1.05rem',
    transition: 'border-color 0.2s'
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.95rem',
    fontWeight: '500'
  },
  checkboxField: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  checkboxLabel: {
    fontSize: '1.05rem'
  },
  formError: {
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '1.05rem',
    fontWeight: '500',
    border: '1px solid'
  },
  button: {
    padding: '1rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
  }
};
