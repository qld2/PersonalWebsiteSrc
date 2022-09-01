/* eslint no-param-reassign: 0 */ // --> OFF

import { createSlice } from '@reduxjs/toolkit';
import IAction from '../IAction';
import { Dimension } from './model/dimension';

export const dimensionSlice = createSlice({
  name: 'dimension',
  initialState: {
    width: 0,
    height: 0,
  } as Dimension,
  reducers: {
    setDimension: (state: Dimension, action: IAction) => {
      const next = state;
      next.width = action.payload.width;
      next.height = action.payload.height;
      next;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDimension } = dimensionSlice.actions;

export default dimensionSlice.reducer;
