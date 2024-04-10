// import React from "react";

export function CalcScore(is_valid:boolean,N:number,v:string[],h:string[],a:number[][],board:number[][]){
  if(!is_valid) return 1;
  const D_d=calc_sum_of_squares(N,v,h,a);
  const D = calc_sum_of_squares(N,v,h,board);
  return Math.max(1,Math.round(1000000*getBaseLog(2,D_d/D)));
}

function calc_sum_of_squares(N:number,v:string[],h:string[], board:number[][]){
  let res:number=0;
  let d:number=0;

  for(var i=0; i<N; ++i){
    for(var j=0; j<N; ++j){
      // 上下を隔てる横長の壁
      if(i<N-1){
        if(h[i][j]=='0'){
          d=board[i][j]-board[i+1][j];
          res+=d*d;
        }
      }
      // 左右を隔てる縦長の壁
      if(j<N-1){
        if(v[i][j]=='0'){
          d=board[i][j]-board[i][j+1];
          res+=d*d;
        }
      }
    }
  }
  return res;
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}