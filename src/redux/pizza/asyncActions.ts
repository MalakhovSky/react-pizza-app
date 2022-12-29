import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { FetchPizzasArgs, Pizza } from "./types";

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
