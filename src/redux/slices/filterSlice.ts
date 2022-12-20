import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Sort ={
  name: string;
    sortProperty: string;
}

interface FilterSliceState {
  searchValue: string,
  categoryId: number,
  currentPage: number,
  sort: Sort
}



const initialState : FilterSliceState = {
  searchValue: '',
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
    setCategiryId(state, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action:PayloadAction<string>) {
      state.searchValue = action.payload;
      console.log(action.payload);
    },
    setSort(state, action:PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const selectFilter = (state:RootState) => state.filterSlice;
export const selectSort = (state:RootState) => state.filterSlice.sort;
export const selectSortProperty = (state:RootState) => state.filterSlice.sort.sortProperty;

export const { setCategiryId, setSort, setCurrentPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
