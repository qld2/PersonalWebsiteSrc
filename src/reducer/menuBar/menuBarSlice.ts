/* eslint no-param-reassign: 0 */ // --> OFF

import { createSlice } from '@reduxjs/toolkit';
import IAction from '../IAction';
import { MetaMenuBar } from './model/menuBar';

export const menuBarSlice = createSlice({
  name: 'menuBar',
  initialState: {
    collapsed: false,
    desireCollapsed: false,
  } as MetaMenuBar,
  reducers: {
    setCollapsed: (state: MetaMenuBar, action: IAction) => {
      const next = state;
      next.collapsed = action.payload.collapsed;
      next;
    },
    setDesireCollapsed: (state: MetaMenuBar, action: IAction) => {
      const next = state;
      next.desireCollapsed = action.payload.desireCollapsed;
      next;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCollapsed, setDesireCollapsed } = menuBarSlice.actions;

export default menuBarSlice.reducer;
