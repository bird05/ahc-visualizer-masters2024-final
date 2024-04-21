import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setTarTurn } from '../../store/tarTurnSlice';
import { setPlayingFlag } from '../../store/playingFlagSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型
// import type { Input_type, Output_type, Ope_type } from "../types/typeFormat"
// import { prependOnceListener } from "process";

export const TarTurnInput = () => {
  // useState==============================
  // const [Input, setInput] = useState([] as Input_type); // Inputデータ
  // const [intervalID,setIntervalID] = useState(null);
  let tarTurnFloat=0; // 目標ターンを少数で扱うための変数
  const refTarTurnFloat = useRef(tarTurnFloat);
  let intervalID=0;
  const refIntervalID = useRef(intervalID);
  // Redux==============================
  const ope = useSelector((state) => state.output.b.ope);
  const tarTurn = useSelector((state) => state.tarTurn.tarTurn);
  const FPS = useSelector((state) => state.tarTurn.FPS);
  const seed = useSelector((state) => state.input.seed);
  const playingFlag = useSelector((state) => state.playingFlag.playingFlag);
  const dispatch = useDispatch();
  // useEffect==============================
  const refTarTurn = useRef(tarTurn);
  const refFPS = useRef(FPS);
  useEffect(() => {
    refTarTurn.current = tarTurn;
    refTarTurnFloat.current = tarTurn;
    // console.log(refTarTurn.current);
  },[tarTurn]);
  useEffect(() => {
    refFPS.current = FPS;
  },[FPS]);
  useEffect(() => {
    if(playingFlag) playBoard();
    else stopBoard();
  },[playingFlag]);
  // Seed変更時にターンを0に戻す
  useEffect(() => {
    dispatch(setTarTurn(0));
  },[seed]);
  // Styled CSS==============================
  const InputTrunSelect = styled.input`
  width:70px;
  text-align:right; 
  `
  const SLabel = styled.label`
  padding: 0px 4px 0px 15px;
  `

  // 関数==============================
  // 定期実行
  const advanceTarTurn = () => {
    refTarTurnFloat.current+=refFPS.current/10;
    console.log(refTarTurnFloat.current);
    dispatch(setTarTurn(Number(Math.min(ope.length, Math.trunc(refTarTurnFloat.current)))));
    // dispatch(setTarTurn(Number(Math.min(ope.length, refTarTurn.current+Math.trunc(refFPS.current/10)))));
    // console.log(refTarTurn.current);
  }
  // 再生開始
  function playBoard(){
    clearInterval(refIntervalID.current);
    refIntervalID.current = setInterval(() => {
      // ターン上限で停止
      if(refTarTurn.current>=ope.length){
        stopBoard();
      }else{
        advanceTarTurn();
      }
    }, 100);
  }
  // 再生停止
  const stopBoard = () => {
    // console.log("stop");
    clearInterval(refIntervalID.current);
    refIntervalID.current=0;
    dispatch(setPlayingFlag(false))
  }
  // DOM==============================
  console.log("TarTurnInput");
  return(
    <>
      <SLabel>turn:</SLabel>
      <InputTrunSelect type="number" id="turn" defaultValue={tarTurn} min={0} max={ope.length} onChange={(e) => dispatch(setTarTurn(e.target.value))}/>
    </>
  )
};