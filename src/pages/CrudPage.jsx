import React, { useState } from 'react';
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  addRecord,
  updateRecord,
  deleteRecord,
  setEditingRecord,
  clearEditingRecord,
  selectRecords,
  selectTotalRecords,
  selectEditingRecord,
} from '../features/crud/crudSlice';
import { logoutUser } from '../features/auth/authSlice';

const CrudPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const records = useSelector(selectRecords);
  const totalRecords = useSelector(selectTotalRecords);
  const editingRecord = useSelector(selectEditingRecord);
  const { user } = useSelector((state) => state.auth);

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
  });

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleOpenDialog = (record = null) => {
    if (record) {
      setFormData({
        name: record.name || '',
        email: record.email || '',
        role: record.role || '',
        department: record.department || '',
      });
      dispatch(setEditingRecord(record));
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
        department: '',
      });
      dispatch(clearEditingRecord());
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
    });
    dispatch(clearEditingRecord());
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingRecord) {
      dispatch(updateRecord({ id: editingRecord.id, ...formData }));
    } else {
      dispatch(addRecord(formData));
    }
    
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteRecord(id));
    }
  };

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
            CRUD Operations
          </Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={() => navigate('/products')}
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
              View Products
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ 
                mr: 2,
                background: 'linear-gradient(45deg, #10b981 0%, #06b6d4 100%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #059669 0%, #0891b2 100%)',
                }
              }}
            >
              Add Record
            </Button>
            <Button 
              variant="contained" 
              onClick={handleLogout}
              sx={{
                background: 'linear-gradient(45deg, #10b981 0%, #06b6d4 100%)',
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
                  Name
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Email
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Role
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Department
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Created At
                </TableCell>
                <TableCell 
                  sx={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography 
                      variant="h6" 
                      color="#10b981" 
                      sx={{ 
                        py: 4,
                        fontWeight: 600
                      }}
                    >
                      No records found. Click "Add Record" to create your first record.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow 
                    hover 
                    key={record.id}
                    sx={{ 
                      '&:nth-of-type(even)': { backgroundColor: 'rgba(16, 185, 129, 0.04)' },
                      '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.08)' }
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: '#10b981' }}>
                      #{record.id}
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold" color="#1e293b">
                        {record.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="#64748b">
                        {record.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={record.role}
                        size="small"
                        sx={{
                          background: 'linear-gradient(45deg, #10b981 0%, #06b6d4 100%)',
                          color: 'white',
                          fontWeight: 600,
                          borderRadius: 6
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500} color="#1e293b">
                        {record.department}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="#64748b">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        sx={{ 
                          color: '#10b981',
                          '&:hover': { backgroundColor: 'rgba(16, 185, 129, 0.1)' }
                        }}
                        onClick={() => handleOpenDialog(record)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(record.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
          📦 Total Records: {totalRecords}
        </Typography>
        <Typography variant="body2" color="#64748b" fontWeight={500}>
          Showing {records.length} records
        </Typography>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
            color: 'white',
            fontWeight: 600
          }}
        >
          {editingRecord ? 'Edit Record' : 'Add New Record'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="role"
              label="Role"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.role}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="department"
              label="Department"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.department}
              onChange={handleInputChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleCloseDialog}
              sx={{
                color: '#10b981',
                '&:hover': {
                  backgroundColor: 'rgba(16, 185, 129, 0.1)'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #10b981 0%, #06b6d4 100%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #059669 0%, #0891b2 100%)',
                }
              }}
            >
              {editingRecord ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default CrudPage;
