import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { fetchProducts, clearProductsError } from '../features/products/productSlice';
import { logoutUser } from '../features/auth/authSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, error, total } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleRetry = () => {
    dispatch(fetchProducts());
  };

  const handleClearError = () => {
    dispatch(clearProductsError());
  };

  if (isLoading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
          borderRadius: 3,
          p: 4,
          mb: 4,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              fontWeight: 700,
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Product Dashboard
          </Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={() => navigate('/crud')}
              sx={{ 
                mr: 2,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              CRUD Operations
            </Button>
            <Button 
              variant="contained" 
              onClick={handleLogout}
              sx={{
                background: 'linear-gradient(45deg, #10b981 0%, #06b6d4 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #059669 0%, #0891b2 100%)',
                }
              }}
            >
              Logout ({user?.username})
            </Button>
          </Box>
        </Box>
      </Box>

      {error && (
        <Alert
          severity="error"
          onClose={handleClearError}
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Retry
            </Button>
          }
          sx={{ mb: 3, borderRadius: 2 }}
        >
          {error}
        </Alert>
      )}

      <Paper 
        sx={{ 
          width: '100%', 
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
        }}
      >
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  ID
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Title
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Description
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Price
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Discount
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Rating
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Stock
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Brand
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Category
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow 
                  hover 
                  key={product.id}
                  sx={{ 
                    '&:nth-of-type(even)': { backgroundColor: 'rgba(16, 185, 129, 0.04)' },
                    '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.08)' }
                  }}
                >
                  <TableCell sx={{ fontWeight: 600, color: '#667eea' }}>
                    #{product.id}
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold" color="#1e293b">
                      {product.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200, color: '#64748b' }}>
                      {product.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body1" 
                      fontWeight={600}
                      sx={{ 
                        color: '#10b981',
                        fontSize: '1.1rem'
                      }}
                    >
                      ${product.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${product.discountPercentage}%`}
                      size="small"
                      sx={{
                        background: 'linear-gradient(45deg, #f59e0b 0%, #fbbf24 100%)',
                        color: 'white',
                        fontWeight: 600,
                        borderRadius: 6
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" fontWeight={600} color="#1e293b">
                        ⭐ {product.rating}
                      </Typography>
                      <Typography variant="caption" color="#64748b" ml={1}>
                        ({product.reviews?.length || 0})
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.stock}
                      size="small"
                      sx={{
                        background: product.stock > 10 
                          ? 'linear-gradient(45deg, #10b981 0%, #34d399 100%)'
                          : 'linear-gradient(45deg, #f59e0b 0%, #fbbf24 100%)',
                        color: 'white',
                        fontWeight: 600,
                        borderRadius: 6
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500} color="#1e293b">
                      {product.brand}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.category}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: '#10b981',
                        color: '#10b981',
                        fontWeight: 500,
                        borderRadius: 6
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box 
        mt={3} 
        display="flex" 
        justifyContent="space-between"
        sx={{
          p: 2,
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: 2,
          border: '1px solid #e2e8f0'
        }}
      >
        <Typography variant="body2" color="#1e293b" fontWeight={600}>
          📦 Total Products: {total}
        </Typography>
        <Typography variant="body2" color="#64748b" fontWeight={500}>
          Showing {products.length} products
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductList;
