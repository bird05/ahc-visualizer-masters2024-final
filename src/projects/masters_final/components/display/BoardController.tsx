import React from "react";
// CSS
import styled from "@emotion/styled";
// ビルトインフック
import { useState,useEffect } from "react";
// Redux関連
import { useSelector } from '../../store/store';
// 型
import { Input_type, Output_type, Result_type } from "../../types/typeFormat"
// 外部コンポーネント
import { CalcScore, getResult } from './CalcScore';
import { BoardDisplay } from './BoardDisplay';
// 関数インポート
import { is_outer_range } from '../../functions/CommonFunctions';
import { setT } from "../../store/statisticsInfoSlice";

export const BoardController = () => {
  // useState==============================
  // const [res, setRes] = useState({ tra:new Array(), vis_turn:new Array() }); // 軌跡等
  const [res, setRes] = useState<Result_type>({tra_lx:new Array(),tra_ly:new Array(),tra_rx:new Array(),tra_ry:new Array(),is_col:new Array(),col_x:new Array(),col_y:new Array(),mes_x:new Array(),mes_y:new Array(),vis_turn:new Array(),score:new Array(),mx_score:new Array()}); // 軌跡等
  // const [turn, setTurn] = useState(0); // ターン

  // Redux==============================
  const input_body=useSelector((state) => state.input.b);
  const output_body=useSelector((state) => state.output.b);
  const tarTurn = useSelector((state) => state.tarTurn.tarTurn);
  const showCond = useSelector((state) => state.displayCondition.showCond);

  // useEffect==============================
  useEffect(() => {
    const res_buf:any = getResult(input_body,output_body);
    setRes(res_buf);
    // updateBoard(input_body.a,output_body.pi,output_body.pj,output_body.qi,output_body.qj); // ターン更新前に描画するためにここにも記載
  },[input_body,output_body])
  useEffect(() => {
    updateBoard(0); // ターン更新前に描画するためにここにも記載
  },[res])
  useEffect(() => {
    updateBoard(tarTurn);
  },[tarTurn,showCond])
  
  // 関数==============================
  // 現在位置を渡して盤面を描画する関数
  function updateBoard(turn:number){
    // turn=0の場合の位置をセット
    let cx:number = input_body.sx;
    let cy:number = input_body.sy;
    // turn>0なら移動後の位置をセット
    if(res && turn>0 && res.tra_lx.length>0){
      if(res) cx = res.is_col[turn-1]?res.tra_lx[turn-1]:res.tra_rx[turn-1];
      if(res) cy = res.is_col[turn-1]?res.tra_ly[turn-1]:res.tra_ry[turn-1];
    }
    const canvas=BoardDisplay(
      500,500,
      input_body,
      output_body,
      cx,cy,
      res,
      turn,
      {showTra:showCond.trajectory,showTail:showCond.tail,showCross:showCond.collision}, // 軌跡,しっぽ,×
    );
    const pa=document.getElementById("board");
    // console.log("disp");
    if(pa) pa.replaceChildren(canvas);
  }

  // DOM==============================
  // console.log("Board Controller");
  return(
    <>
      <SDivFlex>
        <SDiv>Current Score:{res.score[tarTurn]}</SDiv>
        <SDiv>Score:{res.mx_score[tarTurn]}</SDiv>
      </SDivFlex>
      <div id="board"></div>
    </>
  )
};
const SDivFlex = styled.div`
  display: flex;
`
const SDiv = styled.div`
  min-width:150px;
  display: flex;
`