/* eslint no-param-reassign: 0 */ // --> OFF

import { createSlice } from '@reduxjs/toolkit';
import IAction from '../IAction';
import { MetaMenuBar } from './model/menuBar';

export const menuBarSlice = createSlice({
  name: 'menuBar',
  initialState: {
    width: 200,
  } as MetaMenuBar,
  reducers: {
    setMenuBarSize: (state: MetaMenuBar, action: IAction) => {
      const next = state;
      next.width = action.payload.width;
      next;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMenuBarSize } = menuBarSlice.actions;

export default menuBarSlice.reducer;
