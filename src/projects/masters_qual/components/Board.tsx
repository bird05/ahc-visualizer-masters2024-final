import React from "react";
// ビルトインフック
import { useState,useEffect } from "react";
// Redux関連
import { useSelector } from '../store/store';
// 型
import { Input_type, Output_type, Ope_type } from "../types/typeFormat"

import { Stage, Layer, Rect, Line, Text, Circle } from 'react-konva';

// let N:number=10;

export const Board = () => {
  // useState==============================
  const [IsFormatOk, setIsFormatOk] = useState(0); // Inputデータの整合性
  const [board, setBoard] = useState<number[][]>([]); // 盤面
  const [turn, setTurn] = useState(0); // ターン
  const [x1, setX1] = useState(0); // x,y
  const [y1, setY1] = useState(0); // x,y
  const [x2, setX2] = useState(0); // x,y
  const [y2, setY2] = useState(0); // x,y

  // Redux==============================
  const t = useSelector((state) => state.input.t);
  const N = useSelector((state) => state.input.N);
  const v = useSelector((state) => state.input.v);
  const h = useSelector((state) => state.input.h);
  const a = useSelector((state) => state.input.a);

  const pi = useSelector((state) => state.output.pi);
  const pj = useSelector((state) => state.output.pj);
  const qi = useSelector((state) => state.output.qi);
  const qj = useSelector((state) => state.output.qj);
  const s = useSelector((state) => state.output.s);
  const d = useSelector((state) => state.output.d);
  const e = useSelector((state) => state.output.e);

  const tarTurn = useSelector((state) => state.tarTurn.tarTurn);

  // useEffect==============================
  useEffect(() => {
    ;
  },[])
  useEffect(() => {
    investigateFormat();
    setBoard(a);
    setTurn(0);
  },[a])
  useEffect(() => {
    setX1(pi);
  },[pi])
  useEffect(() => {
    setY1(pj);
  },[pj])
  useEffect(() => {
    setX2(qi);
  },[qi])
  useEffect(() => {
    setY2(qj);
  },[qj])
  useEffect(() => {
    // change_board();
    if(turn<tarTurn) advance_turn();
    if(turn>tarTurn) back_turn();
  },[tarTurn])

  // 関数==============================
  // Inputが正しいフォーマットか判定する関数
  const investigateFormat = () => {
    if(N==0) setIsFormatOk(0);
    else setIsFormatOk(1);
    // setIsFormatOk(1);
  }
  // 値を色に変換する関数
  const val_to_hue = (val:number) => {
    return 205-val/(N*N-1)*205;
  }
  // 盤面を変化させる関数
  // function change_board(): number[][] {
  //   // 交換,移動の順
  //   // 1 (R L) ならば
  //   // 0→1:1 (R L) の順に作用
  //   // 1→0:(L R) 1 の順に作用
  //   let res: number[][] = board; // 初期化
  //   let cu_turn=turn;
  //   while(cu_turn<tarTurn){
  //     ;
  //     cu_turn++;
  //   }
  //   while(cu_turn<tarTurn){
  //     ;
  //     cu_turn--;
  //   }
  //   setTurn(tarTurn);
  //   return res;
  // }
  // 指定ターンから1ターン進める関数
  function advance_turn(){
    // 1 (R L) ならば
    // 0→1:1 (R L) の順に作用
    // 1→0:(L R) 1 の順に作用

    // 初期化
    // https://www.freecodecamp.org/japanese/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
    let board_buf: number[][] = JSON.parse(JSON.stringify(board)); // ディープコピー
    let turn_buf:number = turn;
    let x1_buf,y1_buf,x2_buf,y2_buf:number;
    [x1_buf,y1_buf,x2_buf,y2_buf]=[x1,y1,x2,y2]
    // board_buf[1][1]=35;
    
    // 操作
    while(turn_buf<tarTurn){
      // 入替
      if(s[turn_buf]){
        [board_buf[x1_buf][y1_buf],board_buf[x2_buf][y2_buf]]=[board_buf[x2_buf][y2_buf],board_buf[x1_buf][y1_buf]]; // swap
      }
      // 移動
      if(d[turn_buf]=='L') y1_buf--;
      if(d[turn_buf]=='R') y1_buf++;
      if(d[turn_buf]=='U') x1_buf--;
      if(d[turn_buf]=='D') x1_buf++;
      // 移動
      if(e[turn_buf]=='L') y2_buf--;
      if(e[turn_buf]=='R') y2_buf++;
      if(e[turn_buf]=='U') x2_buf--;
      if(e[turn_buf]=='D') x2_buf++;

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
    let board_buf: number[][] = JSON.parse(JSON.stringify(board)); // ディープコピー
    let turn_buf:number = turn;
    let x1_buf,y1_buf,x2_buf,y2_buf:number;
    [x1_buf,y1_buf,x2_buf,y2_buf]=[x1,y1,x2,y2]
    
    // 逆操作
    while(turn_buf>tarTurn){
      // 移動
      if(d[turn_buf-1]=='L') y1_buf++;
      if(d[turn_buf-1]=='R') y1_buf--;
      if(d[turn_buf-1]=='U') x1_buf++;
      if(d[turn_buf-1]=='D') x1_buf--;
      // 移動
      if(e[turn_buf-1]=='L') y2_buf++;
      if(e[turn_buf-1]=='R') y2_buf--;
      if(e[turn_buf-1]=='U') x2_buf++;
      if(e[turn_buf-1]=='D') x2_buf--;
      // 入替
      if(s[turn_buf-1]){
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
  
  // DOM==============================
  console.log("Board");
  return(
    <>
      {/* Score=1 */}
      {/* tarTurn:{tarTurn} */}
      <Stage width={500} height={500}>
        <Layer>
          {IsFormatOk
            ?
            <>
            {/*四角形*/}
            {board.map((row:Array<number>, r_id:number) => (
              row.map((val: number, c_id:number) => (
                <Rect key={"square"+(r_id*N+c_id)} fill={'hsla('+val_to_hue(val)+',100%,50%,.8)'} x={c_id*500/N} y={r_id*500/N} width={500/N} height={500/N} />
              ))
            ))}
            {/*テキスト*/}
            {board.map((row:Array<number>, r_id:number) => (
              row.map((val: number, c_id:number) => (
                <Text key={"text"+(r_id*N+c_id)} text={val.toString()} fill={'black'} align='center' verticalAlign='middle' fontSize={14} x={c_id*500/N} y={r_id*500/N} width={500/N} height={500/N} />
              ))
            ))}
            {/*ライン*/}
            {board.map((row:Array<number>, index:number) => (
              <Line key={index} x={index*500/N} y={0} points={[0,0,0,500]} stroke='black' strokeWidth={.5} />
            ))}
            {board.map((row:Array<number>, index:number) => (
              <Line key={index} x={0} y={index*500/N} points={[0,0,500,0]} stroke='black' strokeWidth={.5} />
            ))}
            {/*壁*/}
            {v.map((str:string, r_id: number) => (
              [...str].map((c: string, c_id: number) => (
                <Line key={"v"+(r_id*N+c_id)} x={(c_id+1)*500/N} y={r_id*500/N} points={[0,0,0,500/N]} stroke={c=='1'?'rgba(0,0,0,1)':'rgba(0,0,0,0)'} strokeWidth={3.0} />
              ))
            ))}
            {h.map((str:string, r_id: number) => (
              [...str].map((c: string, c_id: number) => (
                <Line key={"h"+(r_id*N+c_id)} x={c_id*500/N} y={(r_id+1)*500/N} points={[0,0,500/N,0]} stroke={c=='1'?'rgba(0,0,0,1)':'rgba(0,0,0,0)'} strokeWidth={3.0} />
              ))
            ))}
            {/*プレイヤー*/}
            <Circle fill='hsla(0,100%,50%,.5)' x={(y1+0.5)*(500/N)} y={(x1+0.5)*(500/N)} radius={500/N/4} />
            <Circle fill='hsla(205,100%,50%,.5)' x={(y2+0.5)*(500/N)} y={(x2+0.5)*(500/N)} radius={500/N/4} />
            </>
            :
            <></>
          }
          {/*枠線*/}
          <Rect stroke='black' strokeWidth={1} x={0} y={0} width={500} height={500} />
        </Layer>
      </Stage>
    </>
  )
};