// import React from "react";
// Redux
import { useSelector } from '../../store/store';
// 型
import { Input_type, Output_type } from "../../types/typeFormat"
// 関数インポート
import { is_outer_range } from '../../functions/CommonFunctions';

// 盤面からスコアを計算する関数
export const CalcScore = function(is_valid:boolean,N:number,v:string[],h:string[],a:number[][],board:number[][]){
  if(!is_valid) return 1;
  if(Number(N) != board.length) return 1;
  const D_d=calc_sum_of_squares(N,v,h,a);
  const D = calc_sum_of_squares(N,v,h,board);
  return Math.max(1,Math.round(1000000*getBaseLog(2,D_d/D)));
}
// Dを計算する関数
export const calc_sum_of_squares = function(N:number,v:string[],h:string[], board:number[][]){
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
// 前回の計算結果と今回の操作からDを差分計算
export const CalcD_def = function(
  is_valid:boolean, N:number, v:string[], h:string[], board:number[][], D:number,
  x1:number, y1:number, x2:number, y2:number,
  s:number, d:string, e:string){
  if(s===0) return D;
  if(!is_valid) return D;
  // 移動前の状態を減算
  D-=get_4squares(v,h,board,x1,y1);
  D-=get_4squares(v,h,board,x2,y2);
  // 入替
  [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap
  // 移動後の状態を加算
  D+=get_4squares(v,h,board,x1,y1);
  D+=get_4squares(v,h,board,x2,y2);
  // 戻す
  [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap

  return D;
}
// CalcScore_d_rev

// 4方向との2乗和を求める関数
const get_4squares = function(v:string[], h:string[], board:number[][], x:number, y:number){
  let res:number=0;
  let d:number=0;
  // L
  if(y-1>=0 && v[x][y-1]=='0'){ // 範囲内のみ実行,壁なしのみ実行
    d=board[x][y-1]-board[x][y];
    res+=d*d;
  }
  // R
  if(y+1<board.length && v[x][y]=='0'){ 
    d=board[x][y+1]-board[x][y];
    res+=d*d;
  }
  // U
  if(x-1>=0 && h[x-1][y]=='0'){
    d=board[x-1][y]-board[x][y];
    res+=d*d;
  }
  // D
  if(x+1<board.length && h[x][y]=='0'){
    d=board[x+1][y]-board[x][y];
    res+=d*d;
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
  const [N,v,h,a]=[input_body.N,input_body.v,input_body.h,input_body.a];
  const [s,d,e]=[output_body.s,output_body.d,output_body.e]
  let [x1,y1,x2,y2]=[output_body.pi,output_body.pj,output_body.qi,output_body.qj];

  const D_d=calc_sum_of_squares(N,v,h,a);
  let D=D_d;
  const res = new Array();

  for(let turn=0; turn<output_body.s.length; ++turn){
    // 得点計算
    // res[turn]=CalcScore(true,N,v,h,input_body.a,board);
    D=CalcD_def(true,N,v,h,board,D,x1,y1,x2,y2,s[turn],d[turn],e[turn]);
    res[turn]=Math.max(1,Math.round(1000000*getBaseLog(2,D_d/D)));
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