import { createSlice } from '@reduxjs/toolkit';

export const statisticsInfoSlice = createSlice({
  name: 'statistics',
  initialState: {
    b: new Array(),
    filtered_b: new Array(),
    t: -1,
    selectedSeed: 0,
  },
  reducers: {
    setAll: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.b=action.payload;
    },
    setFiltered: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.filtered_b=action.payload;
    },
    setT: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.t=action.payload;
    },
    setSelectedSeed: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.selectedSeed=action.payload;
    },
  },
});

export const { setAll, setFiltered, setT, setSelectedSeed } = statisticsInfoSlice.actions;
export default statisticsInfoSlice.reducer;