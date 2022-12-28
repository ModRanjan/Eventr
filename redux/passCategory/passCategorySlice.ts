import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PassCategory } from './type';

export interface IPassCategory {
  passCategories: PassCategory[];
  currentPassCategory: PassCategory | null;
}

const initialState: IPassCategory = {
  passCategories: [],
  currentPassCategory: null,
};

const passCategorySlice = createSlice({
  name: 'passCategory',
  initialState,
  reducers: {
    setPassCategories: (state, action: PayloadAction<PassCategory[]>) => {
      state.passCategories = action.payload;
    },

    setCurrentPassCategory: (state, action: PayloadAction<PassCategory>) => {
      state.currentPassCategory = action.payload;
    },
  },
});

export const { setPassCategories, setCurrentPassCategory } =
  passCategorySlice.actions;

export default passCategorySlice.reducer;
