import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { loginUser, clearError, checkAuth } from '../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/products';

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          // background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
          padding: 2,
        }}
      >
        <Paper 
          elevation={12} 
          sx={{ 
            padding: 4, 
            width: '140%',
            maxWidth: '550px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: '2px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.05)',
          }}
        >
          <Box textAlign="center" mb={3}>
            <Typography 
              component="h1" 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(45deg, #10b981 30%, #06b6d4 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                fontSize: '2.5rem'
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" color="#64748b" fontWeight={500}>
              Sign in to continue to your account
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" onClose={handleClearError} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc',
                  '&:hover fieldset': {
                    borderColor: '#10b981',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#10b981',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#64748b',
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: '#10b981',
                  },
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  fontSize: '1rem',
                  backgroundColor: '#f8fafc',
                  '&:hover fieldset': {
                    borderColor: '#10b981',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#10b981',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#64748b',
                  fontWeight: 500,
                  '&.Mui-focused': {
                    color: '#10b981',
                  },
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              sx={{ 
                mt: 2, 
                mb: 3,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                height: 56,
                background: 'linear-gradient(45deg, #10b981 30%, #06b6d4 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #059669 30%, #0891b2 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={24} />}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Box>

          <Box 
            sx={{ 
              mt: 3,
              p: 2.5,
              background: 'linear-gradient(45deg, #10b981 30%, #06b6d4 90%)',
              borderRadius: 3,
              border: '2px solid #e2e8f0',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)'
            }}
          >
            <Typography 
              variant="body2" 
              color="white" 
              align="center"
              sx={{ fontWeight: 600, display: 'block', mb: 1 }}
            >
              🔐 Demo Credentials
            </Typography>
            <Typography 
              variant="body2" 
              color="rgba(255,255,255,0.9)" 
              align="center"
              sx={{ mt: 1, fontFamily: 'monospace', display: 'block', fontSize: '0.9rem' }}
            >
              username: <strong style={{ color: 'white' }}>sagar</strong><br/>
              password: <strong style={{ color: 'white' }}>sagar01234</strong>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
