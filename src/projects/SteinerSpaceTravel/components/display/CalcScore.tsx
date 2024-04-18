// import React from "react";
// Redux
import { useSelector } from '../../store/store';
// 型
import { Input_type, Output_type } from "../../types/typeFormat"
// 関数インポート
import { is_outer_range } from '../../functions/CommonFunctions';

// スコアを計算する関数
export const CalcScore = function(){
  // Redux==============================
  const input_body=useSelector((state) => state.input.b);
  const output_body=useSelector((state) => state.output.b);

  if(!input_body.is_valid || !output_body.is_valid) return -1;
  
  let S=0;
  const [a, b] = [input_body.a, input_body.b];
  const [c,d,V,t,r] = [output_body.c,output_body.d,output_body.V,output_body.t,output_body.r]
  let cx:number, cy:number, nx:number, ny:number;
  let idx=r[0]-1;
  if(t[0]===1){ // 惑星を訪問
    [cx,cy] = [a[idx],b[idx]]; // 座標変換
  }else{ // 宇宙ステーションを訪問
    [cx,cy] = [c[idx],d[idx]]; // 座標変換
  }
  for(let i=1; i<V; ++i){
    [nx,ny]=[cx,cy];
    idx=r[i]-1;
    if(t[i]===1){ // 惑星を訪問
      [cx,cy] = [a[idx],b[idx]]; // 座標変換
    }else{ // 宇宙ステーションを訪問
      [cx,cy] = [c[idx],d[idx]]; // 座標変換
    }
    let dx=nx-cx;
    let dy=ny-cy;
    let buf=dx*dx+dy*dy;
    // 両方惑星
    if(t[i-1]===1 && t[i]===1){
      buf*=25;
    }else if(t[i-1]===1 || t[i]===1){
      buf*=5;
    }
    S+=buf;
  }
  return Math.round(1000000000/(1000+Math.sqrt(S)));
}