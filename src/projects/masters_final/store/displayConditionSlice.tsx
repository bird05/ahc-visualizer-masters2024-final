import { createSlice } from '@reduxjs/toolkit';

export const displayConditionSlice = createSlice({
  name: 'displayCondition',
  initialState: {
    showCond:{
      tail:false,
      trajectory:false,
      collision:false,
    },
  },
  reducers: {
    setShowTail: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.showCond.tail=action.payload;
    },
    setShowTrajectory: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.showCond.trajectory=action.payload;
    },
    setShowCollision: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.showCond.collision=action.payload;
    },
  },
});

export const { setShowTail, setShowTrajectory, setShowCollision } = displayConditionSlice.actions;
export default displayConditionSlice.reducer;