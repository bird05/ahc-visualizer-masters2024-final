// import React from "react";
// Redux
import { useSelector } from '../../store/store';
// 型
import { Input_type, Output_type } from "../../types/typeFormat"
// 関数インポート
import { is_outer_range } from '../../functions/CommonFunctions';

export const CalcScore = function(is_valid:boolean,N:number,v:string[],h:string[],a:number[][],board:number[][]){
  if(!is_valid) return 1;
  if(Number(N) != board.length) return 1;
  const D_d=calc_sum_of_squares(N,v,h,a);
  const D = calc_sum_of_squares(N,v,h,board);
  return Math.max(1,Math.round(1000000*getBaseLog(2,D_d/D)));
}

const calc_sum_of_squares = function(N:number,v:string[],h:string[], board:number[][]){
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
// 底を指定したlogを計算する関数
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
// 各ターンのScoreを計算する関数
export const CalcScoreSequence = function(input_body:Input_type, output_body:Output_type){
  let board: number[][] = JSON.parse(JSON.stringify(input_body.a)); // 多次元配列のディープコピー
  const [N,v,h]=[input_body.N,input_body.v,input_body.h];
  const [s,d,e]=[output_body.s,output_body.d,output_body.e]
  let [x1,y1,x2,y2]=[output_body.pi,output_body.pj,output_body.qi,output_body.qj];

  const res = new Array();

  for(let turn=0; turn<output_body.s.length; ++turn){
    // 得点計算
    res[turn]=CalcScore(true,N,v,h,input_body.a,board);
    // 入替
    if(s[turn]){
      if(is_outer_range(x1,y1,board.length,board.length)) return res; // 範囲外swapの回避
      if(is_outer_range(x2,y2,board.length,board.length)) return res;
      [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap
    }
    // 移動
    [x1,y1]=move_player(d[turn],x1,y1);
    [x2,y2]=move_player(e[turn],x2,y2);
  }
  res[output_body.s.length]=CalcScore(true,N,v,h,input_body.a,board);

  return res;
}
// プレイヤーを進める関数
export const move_player = function(dir:string, x:number, y:number){
  if(dir=='L') y--;
  if(dir=='R') y++;
  if(dir=='U') x--;
  if(dir=='D') x++;
  return [x,y];
}
// プレイヤーを進める関数(逆方向)
export const move_player_rev = function(dir:string, x:number, y:number){
  if(dir=='L') y++;
  if(dir=='R') y--;
  if(dir=='U') x++;
  if(dir=='D') x--;
  return [x,y];
}