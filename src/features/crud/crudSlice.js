import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  records: [],
  isLoading: false,
  error: null,
  editingRecord: null,
};

const crudSlice = createSlice({
  name: 'crud',
  initialState,
  reducers: {
    // Add new record
    addRecord: (state, action) => {
      const newRecord = {
        id: Date.now(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };
      state.records.push(newRecord);
      state.error = null;
    },
    
    // Update existing record
    updateRecord: (state, action) => {
      const { id, ...updatedData } = action.payload;
      const index = state.records.findIndex(record => record.id === id);
      if (index !== -1) {
        state.records[index] = {
          ...state.records[index],
          ...updatedData,
          updatedAt: new Date().toISOString(),
        };
        state.error = null;
      }
    },
    
    // Delete record
    deleteRecord: (state, action) => {
      const id = action.payload;
      state.records = state.records.filter(record => record.id !== id);
      state.error = null;
    },
    
    // Set record for editing
    setEditingRecord: (state, action) => {
      state.editingRecord = action.payload;
    },
    
    // Clear editing record
    clearEditingRecord: (state) => {
      state.editingRecord = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // Load initial data (optional)
    loadRecords: (state, action) => {
      state.records = action.payload;
      state.error = null;
    },
  },
});

export const {
  addRecord,
  updateRecord,
  deleteRecord,
  setEditingRecord,
  clearEditingRecord,
  clearError,
  setError,
  loadRecords,
} = crudSlice.actions;

// Selectors
export const selectRecords = (state) => state.crud.records;
export const selectTotalRecords = (state) => state.crud.records.length;
export const selectEditingRecord = (state) => state.crud.editingRecord;
export const selectCrudError = (state) => state.crud.error;
export const selectCrudLoading = (state) => state.crud.isLoading;

export default crudSlice.reducer;
