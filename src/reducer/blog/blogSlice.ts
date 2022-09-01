/* eslint no-param-reassign: 0 */ // --> OFF

import { createSlice } from '@reduxjs/toolkit';
import IAction from '../IAction';
import { MetaMenuBar } from '../menuBar/model/menuBar';
import { MetaBlog } from './model/blog';

export const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    test: 0,
  } as MetaBlog,
  reducers: {
    // setBlogState: (state: MetaBlog, action: IAction) => {
    //   const next = state;
    //   next.test = action.payload.test;
    //   next;
    // },
    increment: (state: MetaBlog, action: IAction) => {
      const next = state;
      next.test += 1;
      next;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment } = blogSlice.actions;

export default blogSlice.reducer;
