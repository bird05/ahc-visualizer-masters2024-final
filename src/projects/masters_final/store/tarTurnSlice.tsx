import { createSlice } from '@reduxjs/toolkit';

export const tarTurnSlice = createSlice({
  name: 'tarTurn',
  initialState: {
    tarTurn:0,
    FPS:10,
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
    setFPS: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.FPS=action.payload;
    },
  },
});

export const { setTarTurn, setFPS } = tarTurnSlice.actions;
export default tarTurnSlice.reducer;