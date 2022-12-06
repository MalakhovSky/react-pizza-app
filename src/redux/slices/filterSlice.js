import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Первое состояние
  categoryId: 0,
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategiryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
