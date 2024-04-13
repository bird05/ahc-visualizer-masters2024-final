import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'user',
  initialState: {
    authnum: -1,
    // authnum: 0,
    name: "ゲスト",
  },
  reducers: {
    setAuth: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.authnum=action.payload;
    },
    setName: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.name=action.payload;
    },
  },
});

export const { setAuth, setName } = userInfoSlice.actions;
export default userInfoSlice.reducer;