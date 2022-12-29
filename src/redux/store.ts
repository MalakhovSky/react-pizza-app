import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import cartSlice  from './cart/slice';
import filterSlice  from './filter/slice';
import pizzaSlice  from './pizza/slice';

export const store = configureStore({
  reducer: { filterSlice, cartSlice, pizzaSlice },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDistatch = typeof store.dispatch
export const useAppDistatch = () => useDispatch<AppDistatch>(); 