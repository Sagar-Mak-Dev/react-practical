import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import productSlice from '../features/products/productSlice';
import crudSlice from '../features/crud/crudSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    crud: crudSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
