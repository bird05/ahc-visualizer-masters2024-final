import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setPlayingFlag } from '../../store/playingFlagSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型
import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"
// import { prependOnceListener } from "process";

export const InputFieldPlayStop = () => {
  // useState==============================
  // const [Input, setInput] = useState([] as Input_type); // Inputデータ
  // const [intervalID,setIntervalID] = useState(null);
  let intervalID=0;
  const refIntervalID = useRef(intervalID);
  // Redux==============================
  const playingFlag = useSelector((state) => state.playingFlag.playingFlag);
  const dispatch = useDispatch();
  // useEffect==============================
  // const refTarTurn = useRef(tarTurn);
  // useEffect(() => {
  //   refTarTurn.current = tarTurn;
  // },[tarTurn]);
  // Styled CSS==============================
  const InputTrunSelect = styled.input`
  width:70px;
  text-align:right; 
  `
  const SLabel = styled.label`
  padding: 0px 4px;
  `
  const InputPlayButton = styled.input`
  width: 32px;
  height:32px;
  bottom:5px;
  position:relative;
  `

  // 関数==============================
  // tarTurn読み取り
  const readTarTurn = () => {

  }
  // DOM==============================
  console.log("InputFieldPlayStop");
  return(
    <>
      {!playingFlag
        ?
        <InputPlayButton type="button" id="play" value="▶" onClick={ (e) => dispatch(setPlayingFlag(true)) }/>
        :
        <InputPlayButton type="button" id="stop" value="■" onClick={ (e) => dispatch(setPlayingFlag(false)) }/>
      }
      <InputPlayButton type="button" id="play" value="▶" onClick={ () => dispatch(setPlayingFlag(true)) }/>
      <InputPlayButton type="button" id="stop" value="■" onClick={ () => dispatch(setPlayingFlag(false)) }/>
    </>
  )
};