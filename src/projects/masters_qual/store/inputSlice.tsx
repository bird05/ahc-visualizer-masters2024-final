import { createSlice } from '@reduxjs/toolkit';
// 型
import type { Input_type, Output_type, Ope_type } from "../types/typeFormat"
// 関数インポート
import { text_to_Input } from '../functions/CommonFunctions'

export const inputSlice = createSlice({
  name: 'input',
  initialState: {
    b:{
      is_valid:false,
      t:0,
      N:0,
      v:new Array(),
      h:new Array(),
      a:new Array(),
    } as Input_type,
    seed:0,
  },
  reducers: {
    setInput: (state, action) => {
      // 不正値の場合初期値にする
      if (Number.isNaN(action.payload)){
        state.b.is_valid=false;
        return;
      }
      state.b=text_to_Input(action.payload);
      /*
      const arr = action.payload.split('\n');
      let t:number;
      let N:number;
      let v:string[]=new Array();
      let h:string[]=new Array();
      let a:number[][]=new Array();
      const one_data=arr[0].split(' ');
      // 1行目の要素数が2でない
      if(one_data.length!=2){
        state.b.is_valid=false;
        return;
      }
      // Nが数値ではない
      if(isNaN(one_data[1])){
        state.b.is_valid=false;
        return;
      }
      t=one_data[0];
      N=one_data[1];
      // Nが0以下
      if(N<=0){
        state.b.is_valid=false;
        return;
      }
      if(arr.length<N*3){
        state.b.is_valid=false;
        return;
      }
      for(var i=1; i<N*3; ++i){
        if(i<=N){
          v[i-1]=arr[i];
        }else if(i<=N*2-1){
          h[i-N-1]=arr[i];
        }else{
          a[i-N*2]=arr[i].split(' ');
          // aの要素数がNでない
          if(a[i-N*2].length!=N){
            state.b.is_valid=false;
            return;
          }
        }
      }
      // const res:Input_type = [];
      // let res:Input_type=[];
      const res:Input_type={
        is_valid: true,
        t: t,
        N: N,
        v: v,
        h: h,
        a: a
      }
      state.b=res;
      // console.log(N);
      // state.b.t=t;
      // state.b.N=N;
      // state.b.v=v;
      // state.b.h=h;
      // state.b.a=a;
      */
    },
    setSeed: (state, action) => {
      if (Number.isNaN(action.payload)) return;
      state.seed = action.payload;
    },
  },
});

export const { setInput, setSeed } = inputSlice.actions;
export default inputSlice.reducer;