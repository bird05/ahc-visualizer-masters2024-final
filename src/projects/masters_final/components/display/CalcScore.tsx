// import React from "react";
// Redux
import { useSelector } from '../../store/store';
// 型
import { Input_type, Output_type, Result_type } from "../../types/typeFormat"
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
  // 入替前の状態を減算
  D-=get_4squares(v,h,board,x1,y1);
  D-=get_4squares(v,h,board,x2,y2);
  // 入替
  [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap
  // 入替後の状態を加算
  D+=get_4squares(v,h,board,x1,y1);
  D+=get_4squares(v,h,board,x2,y2);
  // 戻す
  [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap

  return D;
}
// 前回の計算結果と今回の操作からDを差分計算(逆方向)
export const CalcD_def_rev = function(
  is_valid:boolean, N:number, v:string[], h:string[], board:number[][], D:number,
  x1:number, y1:number, x2:number, y2:number,
  s:number, d:string, e:string){
  if(s===0) return D;
  if(!is_valid) return D;
  // 移動
  [x1,y1]=move_player_rev(d,x1,y1);
  [x2,y2]=move_player_rev(d,x2,y2);
  // 入替前の状態を減算
  D-=get_4squares(v,h,board,x1,y1);
  D-=get_4squares(v,h,board,x2,y2);
  // 入替
  [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap
  // 入替後の状態を加算
  D+=get_4squares(v,h,board,x1,y1);
  D+=get_4squares(v,h,board,x2,y2);
  // 戻す
  [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap

  return D;
}
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
// 各ターンのScoreを計算する関数
export const CalcScoreSequence = function(input_body:Input_type, output_body:Output_type){
  // let board: number[][] = JSON.parse(JSON.stringify(input_body.a)); // 多次元配列のディープコピー
  // const [N,v,h,a]=[input_body.N,input_body.v,input_body.h,input_body.a];
  // const [s,d,e]=[output_body.s,output_body.d,output_body.e]
  // let [x1,y1,x2,y2]=[output_body.pi,output_body.pj,output_body.qi,output_body.qj];

  // const D_d=calc_sum_of_squares(N,v,h,a);
  // let D=D_d;
  const res = new Array();

  // for(let turn=0; turn<output_body.s.length; ++turn){
  //   // 得点計算
  //   // res[turn]=CalcScore(true,N,v,h,input_body.a,board);
  //   D=CalcD_def(true,N,v,h,board,D,x1,y1,x2,y2,s[turn],d[turn],e[turn]);
  //   res[turn]=Math.max(1,Math.round(1000000*getBaseLog(2,D_d/D)));
  //   // 入替
  //   if(s[turn]){
  //     if(is_outer_range(x1,y1,board.length,board.length)) return res; // 範囲外swapの回避
  //     if(is_outer_range(x2,y2,board.length,board.length)) return res;
  //     [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap
  //   }
  //   // 移動
  //   [x1,y1]=move_player(d[turn],x1,y1);
  //   [x2,y2]=move_player(e[turn],x2,y2);
  // }
  // res[output_body.s.length]=CalcScore(true,N,v,h,input_body.a,board);

  return res;
}
// 最終状態のScoreを計算する関数
export const CalcEndScore = function(input_body:Input_type, output_body:Output_type){
  // let board: number[][] = JSON.parse(JSON.stringify(input_body.a)); // 多次元配列のディープコピー
  // const [N,v,h,a]=[input_body.N,input_body.v,input_body.h,input_body.a];
  // const [s,d,e]=[output_body.s,output_body.d,output_body.e]
  // let [x1,y1,x2,y2]=[output_body.pi,output_body.pj,output_body.qi,output_body.qj];

  // for(let turn=0; turn<output_body.s.length; ++turn){
  //   // 入替
  //   if(s[turn]){
  //     if(is_outer_range(x1,y1,board.length,board.length)) return 1; // 範囲外swapの回避
  //     if(is_outer_range(x2,y2,board.length,board.length)) return 1;
  //     [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap
  //   }
  //   // 移動
  //   [x1,y1]=move_player(d[turn],x1,y1);
  //   [x2,y2]=move_player(e[turn],x2,y2);
  // }
  // // 最終状態のスコアを計算して返す
  // return CalcScore(true,N,v,h,a,board);

  return 1;
}
// 最終状態の盤面とプレイヤーの位置を計算する関数
export const CalcEndBoardPlace = function(input_body:Input_type, output_body:Output_type){
  // let board: number[][] = JSON.parse(JSON.stringify(input_body.a)); // 多次元配列のディープコピー
  // const [N,v,h,a]=[input_body.N,input_body.v,input_body.h,input_body.a];
  // const [s,d,e]=[output_body.s,output_body.d,output_body.e]
  // let [x1,y1,x2,y2]=[output_body.pi,output_body.pj,output_body.qi,output_body.qj];

  // for(let turn=0; turn<output_body.s.length; ++turn){
  //   // 入替
  //   if(s[turn]){
  //     if(is_outer_range(x1,y1,board.length,board.length)) return 1; // 範囲外swapの回避
  //     if(is_outer_range(x2,y2,board.length,board.length)) return 1;
  //     [board[x1][y1],board[x2][y2]]=[board[x2][y2],board[x1][y1]]; // swap
  //   }
  //   // 移動
  //   [x1,y1]=move_player(d[turn],x1,y1);
  //   [x2,y2]=move_player(e[turn],x2,y2);
  // }
  // // 最終状態を返す
  // return { board,x1,y1,x2,y2 };
  return { board:[],x1:1,y1:1,x2:1,y2:1 };
}
// 交差判定
const judgeIentersected = function(ax:number, ay:number, bx:number, by:number, cx:number, cy:number, dx:number, dy:number) {
  let ta = (cx - dx) * (ay - cy) + (cy - dy) * (cx - ax);
  let tb = (cx - dx) * (by - cy) + (cy - dy) * (cx - bx);
  let tc = (ax - bx) * (cy - ay) + (ay - by) * (ax - cx);
  let td = (ax - bx) * (dy - ay) + (ay - by) * (ax - dx);

  // return tc * td < 0 && ta * tb < 0;
  return tc * td <= 0 && ta * tb <= 0; // 端点を含む場合
};
// 線分を延長した際の交点座標を返す(線分が平行な場合は例外を返す)
// https://qiita.com/malb7mm/items/50a8b9ac85a4b61d4b86
const getIntersection = function(ax:number, ay:number, bx:number, by:number, cx:number, cy:number, dx:number, dy:number) {
  let a1 = ay - by,
    a2 = cy - dy,
    b1 = bx - ax,
    b2 = dx - cx,
    c1 = ax*(by-ay) - ay*(bx-ax),
    c2 = cx*(dy-cy) - cy*(dx-cx);

  // 例外処理
  if (a1*b2 == a2*b1) return [-1000000,-1000000];
    // throw new Error("Invalid Coordinates");

  let x = (c2*b1 - c1*b2) / (a1*b2 - a2*b1);
  let y = (c2*a1 - c1*a2) / (b1*a2 - b2*a1);
  return [x,y];
}
// 線分と点の距離の2乗を求める
// https://zenn.dev/boiledorange73/articles/0037-js-distance-pt-seg
function min_d2(x0, y0, x1, y1, x2, y2) {
  var a = x2 - x1;
  var b = y2 - y1;
  var a2 = a * a;
  var b2 = b * b;
  var r2 = a2 + b2;
  var tt = -(a*(x1-x0)+b*(y1-y0));
  if( tt < 0 ) {
    return (x1-x0)*(x1-x0) + (y1-y0)*(y1-y0);
  }
  if( tt > r2 ) {
    return (x2-x0)*(x2-x0) + (y2-y0)*(y2-y0);
  }
  var f1 = a*(y1-y0)-b*(x1-x0);
  return (f1*f1)/r2;
}
// 距離の2乗を求める
const calcDist2 = function (x1:number, y1:number, x2:number, y2:number){
  let dx:number = x1-x2;
  let dy:number = y1-y2;
  return dx*dx+dy*dy;
}
// ドローンの軌跡を求める関数
/*
export const getTrajectory = function(input_body:Input_type, output_body:Output_type){
  const [input_is_valid,N,M,eps,dlt,sx,sy,px,py,lx,ly,rx,ry,alp,fx,fy]=[input_body.is_valid,input_body.N,input_body.M,input_body.eps,input_body.dlt,input_body.sx,input_body.sy,input_body.px,input_body.py,input_body.lx,input_body.ly,input_body.rx,input_body.ry,input_body.alp,input_body.fx,input_body.fy];
  const [output_is_valid,ope,ax,ay]=[output_body.is_valid,output_body.ope,output_body.ax,output_body.ay];

  const tra = new Array();
  let vis_turn = new Array(); // 各目的地が何ターン目に訪問されるか
  for(let i=0; i<N; ++i) vis_turn.push(5005);

  if(!input_is_valid || ! output_is_valid) return { tra, vis_turn };
  let [x,y] = [sx,sy]; // 変更していくx,y
  let [vx,vy] = [0,0]; // 変更していくx,y

  // 外周を壁の集合に加える
  let lx_add=[...lx];
  let ly_add=[...ly];
  let rx_add=[...rx];
  let ry_add=[...ry];
  const LIM=100000;
  const out_wall_lx:number[]=[-LIM,-LIM,LIM,LIM];
  const out_wall_ly:number[]=[-LIM,LIM,LIM,-LIM];
  const out_wall_rx:number[]=[-LIM,LIM,LIM,-LIM];
  const out_wall_ry:number[]=[LIM,LIM,-LIM,-LIM];
  for(let i=0; i<4; ++i){
    lx_add.push(out_wall_lx[i]);
    ly_add.push(out_wall_ly[i]);
    rx_add.push(out_wall_rx[i]);
    ry_add.push(out_wall_ry[i]);
  }

  for(let turn=0; turn<output_body.ope.length; ++turn){ 
    // 計測線
    let mx:number=0, my:number=0; // 計測線

    // 加速
    if(ope[turn]==='A'){
      vx+=ax[turn];
      vy+=ay[turn];
    // 計測
    }else{
      // mx,myを決める
      let mx_len=3*100000;
      let len=Math.sqrt(ax[turn]*ax[turn]+ay[turn]*ay[turn]);
      let r=mx_len/len;
      // 計測線の終点
      let end_x=x+ax[turn]*r;
      let end_y=y+ay[turn]*r;
      let mn_len2=mx_len*mx_len;
      // 壁、外周との交点を求める
      for(let w_id=0; w_id<lx_add.length; ++w_id){
        if(judgeIentersected(x,y,end_x,end_y,lx_add[w_id],ly_add[w_id],rx_add[w_id],ry_add[w_id])){
          // 注目している壁にぶつかる点
          const [mx_buf,my_buf]=getIntersection(x,y,end_x,end_y,lx_add[w_id],ly_add[w_id],rx_add[w_id],ry_add[w_id]);
          let cu_len2=calcDist2(x,y,mx_buf,my_buf);
          if(cu_len2<mn_len2){
            mn_len2=cu_len2;
            [mx,my]=[mx_buf,my_buf]
          }
        }
      }
    }

    // 誤差
    vx+=Number(fx[turn]);
    vy+=Number(fy[turn]);
    // 移動
    let nx: number = x+vx;
    let ny: number = y+vy;
    
    // 壁衝突判定
    let is_collide: boolean = false;
    let col_x:number=0, col_y:number=0;
    // 壁、外周
    for(let w_id=0; w_id<lx_add.length; ++w_id){
      if(judgeIentersected(x,y,nx,ny,lx_add[w_id],ly_add[w_id],rx_add[w_id],ry_add[w_id])){
        is_collide=true;
        [col_x,col_y]=getIntersection(x,y,nx,ny,lx_add[w_id],ly_add[w_id],rx_add[w_id],ry_add[w_id]);
      }
    }
    
    // 目的地到達判定(衝突していない場合のみ)
    for(let i=0; i<N; ++i){
      if(vis_turn[i]!==5005) continue;
      // 点と線分の距離の2乗
      if(min_d2(px[i],py[i],x,y,nx,ny)<=1000000) vis_turn[i]=turn+1;
    }

    // 軌跡格納
    tra.push(
      {
        lx:x,
        ly:y,
        rx:nx,
        ry:ny,
        is_col:is_collide,       // 衝突判定
        col_x:Math.trunc(col_x), // 衝突座標
        col_y:Math.trunc(col_y), // 衝突座標
        mx:mx,                   // 計測線の到達位置
        my:my,
      }
    );

    // 衝突時の処理
    if(is_collide){
      [vx,vy]=[0,0];
    // 非衝突時の処理
    }else{
      [x,y]=[nx,ny]; // swap
    }
  }
  // console.log(vis_turn);
  return {tra,vis_turn};
}
*/
// 結果を求める関数
export const getResult = function(input_body:Input_type, output_body:Output_type){
  const [input_is_valid,N,M,eps,dlt,sx,sy,px,py,lx,ly,rx,ry,alp,fx,fy]=[input_body.is_valid,input_body.N,input_body.M,input_body.eps,input_body.dlt,input_body.sx,input_body.sy,input_body.px,input_body.py,input_body.lx,input_body.ly,input_body.rx,input_body.ry,input_body.alp,input_body.fx,input_body.fy];
  const [output_is_valid,ope,ax,ay]=[output_body.is_valid,output_body.ope,output_body.ax,output_body.ay];
  const res:Result_type={
    tra_lx: new Array(),       // 軌跡の始点
    tra_ly: new Array(),       // 軌跡の始点
    tra_rx: new Array(),       // 軌跡の終点
    tra_ry: new Array(),       // 軌跡の終点
    is_col: new Array(),   // 衝突判定
    col_x: new Array(),    // 衝突座標
    col_y: new Array(),    // 衝突座標
    mes_x: new Array(),       // 計測線の到達位置
    mes_y: new Array(),       // 計測線の到達位置
    vis_turn: new Array(), // 各目的地が何ターン目に訪問されるか
  };
  let tra_lx: number[]=new Array();
  let tra_ly: number[]=new Array();
  let tra_rx: number[]=new Array();
  let tra_ry: number[]=new Array();
  let is_col: boolean[]=new Array();
  let col_x: number[]=new Array();
  let col_y: number[]=new Array();
  let mes_x: number[]=new Array();
  let mes_y: number[]=new Array();
  let vis_turn: number[]=new Array();

  for(let i=0; i<N; ++i) vis_turn.push(5005);

  if(!input_is_valid || ! output_is_valid) return res;
  let [x,y] = [sx,sy]; // 変更していくx,y
  let [vx,vy] = [0,0]; // 変更していくx,y

  // 外周を壁の集合に加える
  let lx_add=[...lx];
  let ly_add=[...ly];
  let rx_add=[...rx];
  let ry_add=[...ry];
  const LIM=100000;
  const out_wall_lx:number[]=[-LIM,-LIM,LIM,LIM];
  const out_wall_ly:number[]=[-LIM,LIM,LIM,-LIM];
  const out_wall_rx:number[]=[-LIM,LIM,LIM,-LIM];
  const out_wall_ry:number[]=[LIM,LIM,-LIM,-LIM];
  for(let i=0; i<4; ++i){
    lx_add.push(out_wall_lx[i]);
    ly_add.push(out_wall_ly[i]);
    rx_add.push(out_wall_rx[i]);
    ry_add.push(out_wall_ry[i]);
  }

  for(let turn=0; turn<output_body.ope.length; ++turn){ 
    // 計測線
    let mx:number=0, my:number=0; // 計測線

    // 加速
    if(ope[turn]==='A'){
      vx+=ax[turn];
      vy+=ay[turn];
    // 計測
    }else{
      // mx,myを決める
      let mx_len=3*100000;
      let len=Math.sqrt(ax[turn]*ax[turn]+ay[turn]*ay[turn]);
      let r=mx_len/len;
      // 計測線の終点
      let end_x=x+ax[turn]*r;
      let end_y=y+ay[turn]*r;
      let mn_len2=mx_len*mx_len;
      // 壁、外周との交点を求める
      for(let w_id=0; w_id<lx_add.length; ++w_id){
        if(judgeIentersected(x,y,end_x,end_y,lx_add[w_id],ly_add[w_id],rx_add[w_id],ry_add[w_id])){
          // 注目している壁にぶつかる点
          const [mx_buf,my_buf]=getIntersection(x,y,end_x,end_y,lx_add[w_id],ly_add[w_id],rx_add[w_id],ry_add[w_id]);
          let cu_len2=calcDist2(x,y,mx_buf,my_buf);
          if(cu_len2<mn_len2){
            mn_len2=cu_len2;
            [mx,my]=[mx_buf,my_buf]
          }
        }
      }
    }

    // 誤差
    vx+=Number(fx[turn]);
    vy+=Number(fy[turn]);
    // 移動
    let nx: number = x+vx;
    let ny: number = y+vy;
    
    // 壁衝突判定
    let is_collide: boolean = false;
    let col_x_b:number=0, col_y_b:number=0;
    // 壁、外周
    for(let w_id=0; w_id<lx_add.length; ++w_id){
      if(judgeIentersected(x,y,nx,ny,lx_add[w_id],ly_add[w_id],rx_add[w_id],ry_add[w_id])){
        is_collide=true;
        [col_x_b,col_y_b]=getIntersection(x,y,nx,ny,lx_add[w_id],ly_add[w_id],rx_add[w_id],ry_add[w_id]);
      }
    }
    
    // 目的地到達判定(衝突していない場合のみ)
    for(let i=0; i<N; ++i){
      if(vis_turn[i]!==5005) continue;
      // 点と線分の距離の2乗
      if(min_d2(px[i],py[i],x,y,nx,ny)<=1000000) vis_turn[i]=turn+1;
    }

    // 結果格納
    tra_lx.push(x);
    tra_ly.push(y);
    tra_rx.push(nx);
    tra_ry.push(ny);
    is_col.push(is_collide);
    col_x.push(col_x_b);
    col_y.push(col_y_b);
    mes_x.push(mx);
    mes_y.push(my);

    // 衝突時の処理
    if(is_collide){
      [vx,vy]=[0,0];
    // 非衝突時の処理
    }else{
      [x,y]=[nx,ny]; // swap
    }
  }

  [res.tra_lx, res.tra_ly, res.tra_rx, res.tra_ry, res.is_col, res.col_x, res.col_y, res.mes_x, res.mes_y, res.vis_turn] = 
  [tra_lx,tra_ly,tra_rx,tra_ry,is_col, col_x, col_y, mes_x, mes_y, vis_turn]
  return res;
}