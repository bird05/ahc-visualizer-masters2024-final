// 型
import type { Input_type, Output_type } from "../types/typeFormat"

// export const val_to_hue = (val:number) => {
//   const N:number=10;
//   return 205-val/(N*N-1)*205;
// }
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
    eps: 0, // 風
    dlt: 0, // 測定
    sx: 0,
    sy: 0,
    px: new Array(),
    py: new Array(),
    lx: new Array(),
    ly: new Array(),
    rx: new Array(),
    ry: new Array(),
    alp: new Array(),
    fx: new Array(),
    fy: new Array(),
  };
  let N: number=0;
  let M: number=0;
  let eps: number=0; // 風
  let dlt: number=0; // 測定
  let sx: number=0;
  let sy: number=0;
  let px: number[]=new Array();
  let py: number[]=new Array();
  let lx: number[]=new Array();
  let ly: number[]=new Array();
  let rx: number[]=new Array();
  let ry: number[]=new Array();
  let alp: number[]=new Array();
  let fx: number[]=new Array();
  let fy: number[]=new Array();
  
  const one_data=arr[0].split(' ');
  // 1行目の要素数が4でない
  if(one_data.length!=4){
    res.is_valid=false;
    return res;
  }
  // Nが数値ではない
  if(isNaN(one_data[0])){
    res.is_valid=false;
    return res;
  }
  N=Number(one_data[0]);
  M=Number(one_data[1]);
  eps=Number(one_data[2]);
  dlt=Number(one_data[3]);
  // Nが0以下
  if(N<=0){
    res.is_valid=false;
    return res;
  }
  // 行数不足
  if(arr.length<N+M+2+10000){
    res.is_valid=false;
    return res;
  }
  const one_data2=arr[1].split(' ');
  // 初期位置が不正
  if(one_data2.length!==2){
    res.is_valid=false;
    return res;
  }
  sx=Number(one_data2[0]);
  sy=Number(one_data2[1]);
  // 目的地
  for(let i=2; i<N+2; ++i){
    const one_data3=arr[i].split(' ');
    // 目的地が不正
    if(one_data3.length!==2){
      res.is_valid=false;
      return res;
    }
    px[i-2]=Number(one_data3[0]);
    py[i-2]=Number(one_data3[1]);
  }
  // 壁
  for(let i=N+2; i<N+M+2; ++i){
    const one_data4=arr[i].split(' ');
    // 壁が不正
    if(one_data4.length!==4){
      res.is_valid=false;
      return res;
    }
    lx[i-N-2]=Number(one_data4[0]);
    ly[i-N-2]=Number(one_data4[1]);
    rx[i-N-2]=Number(one_data4[2]);
    ry[i-N-2]=Number(one_data4[3]);
  }
  // 計測誤差
  for(let i=N+M+2; i<N+M+2+5000; ++i){
    const one_data5=arr[i].split(' ');
    // 計測誤差が不正
    if(one_data5.length!==1){
      res.is_valid=false;
      return res;
    }
    alp[i-N-M-2]=Number(one_data5[0]);
  }
  // 風誤差
  for(let i=N+M+2+5000; i<N+M+2+10000; ++i){
    const one_data6=arr[i].split(' ');
    // 風誤差が不正
    if(one_data6.length!==2){
      res.is_valid=false;
      return res;
    }
    fx[i-N-M-2-5000]=Number(one_data6[0]);
    fy[i-N-M-2-5000]=Number(one_data6[1]);
  }
  
  [res.N, res.M, res.eps, res.dlt, res.sx, res.sy, res.px, res.py, res.lx, res.ly, res.rx, res.ry, res.alp, res.fx, res.fy] = 
  [N, M, eps, dlt, sx, sy, px, py, lx, ly, rx, ry, alp, fx, fy];
  return res;
}
// textをOutputに変換する
export const text_to_Output = function(text):Output_type{
  const arr = text.split('\n');
  const res:Output_type={
    is_valid: true,
    ope: new Array(),
    ax: new Array(),
    ay: new Array(),
  }
  let ope:string[]=new Array();
  let ax:number[]=new Array();
  let ay:number[]=new Array();
  for(let i=0; i<arr.length; ++i){
    const one_data=arr[i].split(' ');
    if(one_data[0].substr(0,1)==='#') continue;
    // 要素数が3でない
    if(one_data.length!=3) break;
    
    ope.push(one_data[0]);
    ax.push(Number(one_data[1]));
    ay.push(Number(one_data[2]));
    // ope[i]=one_data[0];
    // ax[i]=Number(one_data[1]);
    // ay[i]=Number(one_data[2]);
  }

  [res.ope, res.ax, res.ay] = [ope, ax, ay];
  return res;
}