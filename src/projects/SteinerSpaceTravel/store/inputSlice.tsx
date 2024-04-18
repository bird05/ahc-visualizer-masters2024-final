import { createSlice } from '@reduxjs/toolkit';
// 型
import type { Input_type } from "../types/typeFormat"
// 関数インポート
import { text_to_Input } from '../functions/CommonFunctions'

export const inputSlice = createSlice({
  name: 'input',
  initialState: {
    b:{
      is_valid:false,
      N:0,
      M:0,
      a:new Array(),
      b:new Array(),
    } as Input_type,
    seed:0,
    isCompleteSet:false,
  },
  reducers: {
    setInput: (state, action) => {
      // 不正値の場合初期値にする
      if (Number.isNaN(action.payload)){
        state.b.is_valid=false;
        return;
      }
      state.b=text_to_Input(action.payload);
      state.isCompleteSet=true;
    },
    setSeed: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.isCompleteSet=false;
      state.seed = action.payload;
    },
    // setIsCompleteSeedEffect: (state, action) => {
    //   if (Number.isNaN(action.payload)) return;
    //   state.seed = action.payload;
    // },
  },
});

export const { setInput, setSeed } = inputSlice.actions;
export default inputSlice.reducer;