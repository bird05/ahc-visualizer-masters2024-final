import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setPlayingFlag } from '../../store/playingFlagSlice';
import { setTarTurn } from '../../store/tarTurnSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型
import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"

export const PlayStopButton = () => {
  // useState==============================
  // const [Input, setInput] = useState([] as Input_type); // Inputデータ
  // const [intervalID,setIntervalID] = useState(null);
  // Redux==============================
  const playingFlag = useSelector((state) => state.playingFlag.playingFlag, shallowEqual);
  // const tarTurn = useSelector((state) => state.tarTurn.tarTurn);
  // const s = useSelector((state) => state.output.s);
  const dispatch = useDispatch();
  // useEffect==============================
  // const refTarTurn = useRef(tarTurn);
  // useEffect(() => {
  //   refTarTurn.current = tarTurn;
  // },[tarTurn]);
  // Styled CSS==============================
  const InputPlayButton = styled.input`
  width: 32px;
  height:32px;
  bottom:5px;
  //position:relative;
  `

  // 関数==============================
  // // 0フレーム目に戻る
  // const move_zero = () => {
  //   dispatch(setPlayingFlag(false));
  //   dispatch(setTarTurn(0));
  // }
  // // 1フレーム戻る
  // const back_one = () => {
  //   dispatch(setPlayingFlag(false));
  //   if(tarTurn>0) dispatch(setTarTurn(tarTurn-1));
  // }
  // // 1フレーム進む
  // const advance_one = () => {
  //   dispatch(setPlayingFlag(false));
  //   if(tarTurn<s.length) dispatch(setTarTurn(tarTurn+1));
  // }
  // // 最終フレームに進む
  // const move_last = () => {
  //   dispatch(setPlayingFlag(false));
  //   dispatch(setTarTurn(s.length));
  // }
  // DOM==============================
  console.log("InputFieldPlayStop");
  return(
    <>
      {/* <InputPlayButton type="button" id="play" value="«" onClick={ (e) => move_zero() }/> */}
      {/* <InputPlayButton type="button" id="play" value="⏴" onClick={ (e) => back_one() }/> */}
      {!playingFlag
        ?
        <InputPlayButton type="button" id="play" value="▶" onClick={ (e) => dispatch(setPlayingFlag(true)) }/>
        :
        <InputPlayButton type="button" id="stop" value="■" onClick={ (e) => dispatch(setPlayingFlag(false)) }/>
      }
      {/* <InputPlayButton type="button" id="play" value="⏵" onClick={ (e) => advance_one }/>
      <InputPlayButton type="button" id="play" value="»" onClick={ (e) => move_last }/> */}
    </>
  )
};