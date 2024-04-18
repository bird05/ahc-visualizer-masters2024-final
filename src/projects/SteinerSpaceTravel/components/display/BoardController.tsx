import React from "react";
// ビルトインフック
import { useState,useEffect } from "react";
// Redux関連
import { useSelector } from '../../store/store';
// 型
// import { Input_type, Output_type, Ope_type } from "../../types/typeFormat"
// 外部コンポーネント
import { CalcScore } from './CalcScore';
import { BoardDisplay } from './BoardDisplay';
// 関数インポート
import { is_outer_range } from '../../functions/CommonFunctions';

export const BoardController = () => {
  // useState==============================
  // const [board, setBoard] = useState<number[][]>([]); // 盤面
  // const [turn, setTurn] = useState(0); // ターン

  // Redux==============================
  const input_body=useSelector((state) => state.input.b);
  const output_body=useSelector((state) => state.output.b);
  const tarTurn = useSelector((state) => state.tarTurn.tarTurn);

  // useEffect==============================
  useEffect(() => {
    updateBoard(); // ターン更新前に描画するためにここにも記載
  },[input_body,output_body,tarTurn])

  // 関数==============================
  function updateBoard(){
    const canvas=BoardDisplay(
      500,500,
      input_body.is_valid,input_body.N,input_body.M,input_body.a,input_body.b,
      output_body.is_valid,output_body.c,output_body.d,output_body.V,output_body.t,output_body.r,
      tarTurn
    );
    const pa=document.getElementById("board");
    if(pa) pa.replaceChildren(canvas);
  }

  // DOM==============================
  // console.log("Board Controller");
  return(
    <>
      {/* Score:{CalcScore(input_body.is_valid && output_body.is_valid,input_body.N,input_body.v,input_body.h,input_body.a,board)} */}
      Score:{CalcScore()}
      <div id="board"></div>
    </>
  )
};