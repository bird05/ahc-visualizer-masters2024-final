import React from "react";
// ビルトインフック
import { useState,useEffect } from "react";
// Redux関連
import { useSelector } from '../../store/store';
// 型
// import { Input_type, Output_type, Ope_type } from "../../types/typeFormat"
// 外部コンポーネント
import { CalcScore, move_player, move_player_rev, getTrajectory } from './CalcScore';
import { BoardDisplay } from './BoardDisplay';
// 関数インポート
import { is_outer_range } from '../../functions/CommonFunctions';
import { setT } from "../../store/statisticsInfoSlice";

export const BoardController = () => {
  // useState==============================
  const [trajectory, setTrajectory] = useState<any>([]); // 盤面
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
    setTurn(0);
    const res:any = getTrajectory(input_body,output_body);
    setTrajectory(res);
    // updateBoard(input_body.a,output_body.pi,output_body.pj,output_body.qi,output_body.qj); // ターン更新前に描画するためにここにも記載
  },[input_body,output_body])
  useEffect(() => {
    updateBoard(0); // ターン更新前に描画するためにここにも記載
  },[trajectory])
  useEffect(() => {
    updateBoard(tarTurn);
  },[tarTurn])
  
  // 関数==============================
  // 現在位置を渡して盤面を描画する関数
  function updateBoard(turn:number){
    let cx:number = input_body.sx;
    let cy:number = input_body.sy;
    if(turn>=1 && trajectory.length>0){
      cx = trajectory[turn-1].is_col?trajectory[turn-1].lx:trajectory[turn-1].rx;
      cy = trajectory[turn-1].is_col?trajectory[turn-1].ly:trajectory[turn-1].ry;
    }
    const canvas=BoardDisplay(
      500,500,
      input_body.is_valid,
      input_body.px,input_body.py,
      input_body.lx,input_body.ly,input_body.rx,input_body.ry,
      cx,cy,
      trajectory
    );
    const pa=document.getElementById("board");
    // console.log("disp");
    if(pa) pa.replaceChildren(canvas);
  }

  // DOM==============================
  // console.log("Board Controller");
  return(
    <>
      {/* Score:{CalcScore(input_body.is_valid && output_body.is_valid,input_body.N,input_body.v,input_body.h,input_body.a,board)} */}
      <div id="board"></div>
    </>
  )
};