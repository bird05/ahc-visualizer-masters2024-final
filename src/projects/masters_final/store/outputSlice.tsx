import { createSlice } from '@reduxjs/toolkit';
// 型
import type { Input_type, Output_type, Ope_type } from "../types/typeFormat"
// 関数インポート
import { text_to_Output } from '../functions/CommonFunctions';

export const outputSlice = createSlice({
  name: 'output',
  initialState: {
    b:{
      is_valid:false,
      pi:-1,
      pj:-1,
      qi:-1,
      qj:-1,
      s:new Array(),
      d:new Array(),
      e:new Array(),
    } as Output_type,
    urls:new Array(),
    urls1:new Array(),
    urls2:new Array(),
    urls3:new Array(),
    isCompleteSet:false,
  },
  reducers: {
    setOutput: (state, action) => {
      if (Number.isNaN(action.payload)){
        state.b.is_valid=false;
        return;
      }
      state.b=text_to_Output(action.payload);
      state.isCompleteSet=true;
    },
    setUrls: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.urls = action.payload;
    },
    setUrls1: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.urls1 = action.payload;
    },
    setUrls2: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.urls2 = action.payload;
    },
    setUrls3: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.urls3 = action.payload;
    },
    // inputSliceにSeedの処理があるのでinputSliceには以下の関数は不要でこちらのみに存在する
    setIsCompleteSet: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.isCompleteSet = action.payload;
    },
  },
});

export const { setOutput, setUrls, setUrls1, setUrls2, setUrls3, setIsCompleteSet } = outputSlice.actions;
export default outputSlice.reducer;