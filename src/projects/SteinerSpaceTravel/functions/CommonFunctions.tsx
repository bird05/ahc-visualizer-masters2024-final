// 型
import type { Input_type, Output_type } from "../types/typeFormat"

// 範囲外判定
export const is_outer_range = function(x:number, y:number, H:number, W:number){
  return x<0 || H<=x || y<0 || W<=y;
}
// 値を色に変換する関数
export const val_to_hue = function(N:number, val:number){
  return 205-val/(N*N-1)*205;
}
// 数値を0埋めして桁数を合わせる関数(num:数値, len:桁数)
export const zeroPadding = function(num, len){
  return ( Array(len).join('0') + num ).slice( -len );
}
// urlからtextを取得する
export const read_text_from_url = async (url) => {
  const response = await fetch(url);
  const text=await response.text();
  return text;
}
// textをInputに変換する
export const text_to_Input = function(text):Input_type{
  const arr = text.split('\n');
  const res:Input_type={
    is_valid: true,
    N: 0,
    M: 0,
    a: new Array(),
    b: new Array()
  }
  let N:number=0;
  let M:number=0;
  let a:number[]=new Array();
  let b:number[]=new Array();
  const one_data=arr[0].split(' ');
  // 1行目の要素数が2でない
  if(one_data.length!=2){
    res.is_valid=false;
    return res;
  }
  // N,Mが数値ではない
  if(isNaN(one_data[0]) || isNaN(one_data[1])){
    res.is_valid=false;
    return res;
  }
  N=Number(one_data[0]);
  M=Number(one_data[1]);
  // Nが0以下
  if(N<=0){
    res.is_valid=false;
    return res;
  }
  // 入力行数が足りない
  if(arr.length<N+1){
    res.is_valid=false;
    return res;
  }
  for(let i=1; i<N+1; ++i){
    const one_data2=arr[i].split(' ');
    // 要素数が2でない
    if(one_data2.length!=2){
      res.is_valid=false;
      return res;
    }
    a[i-1]=Number(one_data2[0]);
    b[i-1]=Number(one_data2[1]);
  }

  [res.N, res.M, res.a, res.b] = [N, M, a, b];
  return res;
}
// textをOutputに変換する
export const text_to_Output = function(text):Output_type{
  const arr = text.split('\n');
  const res:Output_type={
    is_valid: true,
    c: new Array(),
    d: new Array(),
    V: 0,
    t: new Array(),
    r: new Array(),
  }
  let c:number[]=new Array();
  let d:number[]=new Array();
  let V:number=-1;
  let t:number[]=new Array();
  let r:number[]=new Array();

  for(let i=0; i<8; ++i){
    const one_data=arr[i].split(' ');
    // 要素数が2でない
    if(one_data.length!=2){
      res.is_valid=false;
      return res;
    }
    c[i]=Number(one_data[0]);
    d[i]=Number(one_data[1]);
  }
  V=Number(arr[8]);
  // 行数が足りない
  if(arr.length<V+9){
    res.is_valid=false;
    return res;
  }
  for(let i=0; i<V; ++i){
    const one_data=arr[i+9].split(' ');
    // 要素数が2でない
    if(one_data.length!=2){
      res.is_valid=false;
      return res;
    }
    t[i]=Number(one_data[0]);
    r[i]=Number(one_data[1]);
  }

  [res.c, res.d, res.V, res.t, res.r] = [c,d,V,t,r];
  return res;
}