import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

type FetchPizzasArgs = Record<string,string>

export const fetchPizzas = createAsyncThunk<Pizza[],FetchPizzasArgs>('pizza/fetchPizzasStatus', async (params, thankAPI) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://63822c13281f14ffefa1fe72.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  if (data.length === 0) {
    thankAPI.rejectWithValue('Пиццы пустые');
  }

  return thankAPI.fulfillWithValue(data) as Pizza[];
});
type Pizza = {
  id:string; 
  title:string; 
  price:number; 
  imageUrl:string; 
  sizes:number[];
  types:number[];
}

interface PizzaSliceState {
  items:Pizza[];
  status: 'loading' | 'success' | 'error'
}

const initialState:PizzaSliceState = {
  items: [],
  status: 'loading', // loading , success, error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action:PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchPizzas.pending, (state)=>{
        state.status = 'loading';
        state.items = [];
      })
      builder.addCase(fetchPizzas.fulfilled, (state,action)=>{
        state.items = action.payload;
        state.status = 'success';
      })
      builder.addCase(fetchPizzas.rejected, (state,action)=>{
        state.status = 'error';
        state.items = [];
      })
    }
  },
);
export const selectPizzaData = (state:RootState) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
