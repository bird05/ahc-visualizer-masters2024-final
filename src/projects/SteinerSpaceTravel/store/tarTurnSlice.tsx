import { createSlice } from '@reduxjs/toolkit';

export const tarTurnSlice = createSlice({
  name: 'tarTurn',
  initialState: {
    tarTurn:0,
  },
  reducers: {
    setTarTurn: (state, action) => {
      // if (Number.isNaN(action.payload)) return;
      if (Number.isNaN(action.payload)){
        state.tarTurn=0;
        return;
      }
      state.tarTurn=action.payload;
    },
  },
});

export const { setTarTurn } = tarTurnSlice.actions;
export default tarTurnSlice.reducer;