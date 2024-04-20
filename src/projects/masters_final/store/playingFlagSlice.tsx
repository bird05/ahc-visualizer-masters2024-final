import { createSlice } from '@reduxjs/toolkit';

export const playingFlagSlice = createSlice({
  name: 'playingFlag',
  initialState: {
    playingFlag:false,
  },
  reducers: {
    setPlayingFlag: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.playingFlag=action.payload;
    },
  },
});

export const { setPlayingFlag } = playingFlagSlice.actions;
export default playingFlagSlice.reducer;