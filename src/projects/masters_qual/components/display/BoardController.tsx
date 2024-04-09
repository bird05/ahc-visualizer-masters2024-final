import React from "react";
// ビルトインフック
import { useState,useEffect } from "react";
// Redux関連
import { useSelector } from '../../store/store';
// 型
import { Input_type, Output_type, Ope_type } from "../../types/typeFormat"

import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva';
import Konva from 'konva'

import { BoardDisplay } from './BoardDisplay';

// let N:number=10;

export const BoardController = () => {
  // useState==============================
  const [board, setBoard] = useState<number[][]>([]); // 盤面
  const [turn, setTurn] = useState(0); // ターン
  const [x1, setX1] = useState(0); // x,y
  const [y1, setY1] = useState(0); // x,y
  const [x2, setX2] = useState(0); // x,y
  const [y2, setY2] = useState(0); // x,y

  // Redux==============================
  const input_body=useSelector((state) => state.input.b);
  const output_body=useSelector((state) => state.output.b);
  const tarTurn = useSelector((state) => state.tarTurn.tarTurn);

  // useEffect==============================
  useEffect(() => {
    setBoard(input_body.a);
  },[input_body])
  useEffect(() => {
    setX1(output_body.pi);
    setY1(output_body.pj);
    setX2(output_body.qi);
    setY2(output_body.qj);
  },[output_body])
  useEffect(() => {
    setTurn(0);
    updateBoard(input_body.a,output_body.pi,output_body.pj,output_body.qi,output_body.qj); // ターン更新前に描画するためにここにも記載
  },[input_body,output_body])
  useEffect(() => {
    if(turn<tarTurn) advance_turn();
    if(turn>tarTurn) back_turn();
  },[tarTurn])
  useEffect(() => {
    updateBoard(board,x1,y1,x2,y2);
  },[turn])

  // 関数==============================
  // 指定ターンから1ターン進める関数
  function advance_turn(){
    // 1 (R L) ならば
    // 0→1:1 (R L) の順に作用
    // 1→0:(L R) 1 の順に作用

    // 初期化
    // https://www.freecodecamp.org/japanese/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
    let board_buf: number[][] = JSON.parse(JSON.stringify(board)); // 多次元配列のディープコピー
    let turn_buf:number = turn;
    let x1_buf,y1_buf,x2_buf,y2_buf:number;
    [x1_buf,y1_buf,x2_buf,y2_buf]=[x1,y1,x2,y2]
    // board_buf[1][1]=35;
    
    // 操作
    while(turn_buf<tarTurn){
      // 入替
      if(output_body.s[turn_buf]){
        [board_buf[x1_buf][y1_buf],board_buf[x2_buf][y2_buf]]=[board_buf[x2_buf][y2_buf],board_buf[x1_buf][y1_buf]]; // swap
      }
      // 移動
      if(output_body.d[turn_buf]=='L') y1_buf--;
      if(output_body.d[turn_buf]=='R') y1_buf++;
      if(output_body.d[turn_buf]=='U') x1_buf--;
      if(output_body.d[turn_buf]=='D') x1_buf++;
      // 移動
      if(output_body.e[turn_buf]=='L') y2_buf--;
      if(output_body.e[turn_buf]=='R') y2_buf++;
      if(output_body.e[turn_buf]=='U') x2_buf--;
      if(output_body.e[turn_buf]=='D') x2_buf++;

      turn_buf++; // ターンインクリメント
    }

    // 更新
    setBoard(board_buf); // 盤面更新
    setTurn(turn_buf); // ターン更新
    setX1(x1_buf);
    setY1(y1_buf);
    setX2(x2_buf);
    setY2(y2_buf);
  }
  function back_turn(){
    // 1 (R L) ならば
    // 0→1:1 (R L) の順に作用
    // 1→0:(L R) 1 の順に作用

    // 初期化
    let board_buf: number[][] = JSON.parse(JSON.stringify(board)); // 多次元配列のディープコピー
    let turn_buf:number = turn;
    let x1_buf,y1_buf,x2_buf,y2_buf:number;
    [x1_buf,y1_buf,x2_buf,y2_buf]=[x1,y1,x2,y2]
    
    // 逆操作
    while(turn_buf>tarTurn){
      // 移動
      if(output_body.d[turn_buf-1]=='L') y1_buf++;
      if(output_body.d[turn_buf-1]=='R') y1_buf--;
      if(output_body.d[turn_buf-1]=='U') x1_buf++;
      if(output_body.d[turn_buf-1]=='D') x1_buf--;
      // 移動
      if(output_body.e[turn_buf-1]=='L') y2_buf++;
      if(output_body.e[turn_buf-1]=='R') y2_buf--;
      if(output_body.e[turn_buf-1]=='U') x2_buf++;
      if(output_body.e[turn_buf-1]=='D') x2_buf--;
      // 入替
      if(output_body.s[turn_buf-1]){
        [board_buf[x1_buf][y1_buf],board_buf[x2_buf][y2_buf]]=[board_buf[x2_buf][y2_buf],board_buf[x1_buf][y1_buf]]; // swap
      }

      turn_buf--; // ターンデクリメント
    }

    // 更新
    setBoard(board_buf); // 盤面更新
    setTurn(turn_buf); // ターン更新
    setX1(x1_buf);
    setY1(y1_buf);
    setX2(x2_buf);
    setY2(y2_buf);
  }
  
  function updateBoard(board_l:number[][], x1:number ,y1:number ,x2:number ,y2:number ){
    const canvas=BoardDisplay(input_body.is_valid,input_body.N,input_body.v,input_body.h,board_l,x1,y1,x2,y2);
    const pa=document.getElementById("board");
    // console.log("disp");
    if(pa) pa.replaceChildren(canvas);
  }

  // DOM==============================
  // console.log("Board");
  return(
      <div id="board"></div>
  )
};