import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';


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
//обеъкт описания списка (ключ\значение)
export enum Status {
  LOADING = 'loading',
  COMPLETED = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items:Pizza[];
  status: Status
}

const initialState:PizzaSliceState = {
  items: [],
  status: Status.LOADING // loading , success, error
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
        state.status = Status.LOADING;
        state.items = [];
      })
      builder.addCase(fetchPizzas.fulfilled, (state,action)=>{
        state.items = action.payload;
        state.status = Status.COMPLETED;
      })
      builder.addCase(fetchPizzas.rejected, (state,action)=>{
        state.status = Status.ERROR;
        state.items = [];
      })
    }
  },
);
export const selectPizzaData = (state:RootState) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
