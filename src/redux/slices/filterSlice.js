import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Первое состояние
  categoryId: 0,
  sort: {
    name: 'Популярности',
    sortProperty: 'raiting',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategiryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setCategiryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
