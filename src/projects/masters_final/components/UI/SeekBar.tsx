import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setTarTurn } from '../../store/tarTurnSlice';
import { setPlayingFlag } from '../../store/playingFlagSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Slider from '@mui/material/Slider';
// 型
import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"

export const SeekBar = () => {
  // Redux==============================
  const ope = useSelector((state) => state.output.b.ope);
  const tarTurn = useSelector((state) => state.tarTurn.tarTurn);
  const dispatch = useDispatch();
  // useState==============================
  // const [displayTurn,setDisplayTurn] = useState(tarTurn);
  // useEffect==============================
  // const refTarTurn = useRef(tarTurn);
  // Styled CSS==============================
  

  // 関数==============================
  // const handleChange = (event: Event, newValue: number | number[]) => { // TODO:後半のnumber[]は不要そう
  //   let res=newValue as number;
  //   if(res!=displayTurn) dispatch(setTarTurn(res));
  //   setDisplayTurn(res);
  // }
  const handleChange = (event: Event, newValue: number | number[]) => { // TODO:後半のnumber[]は不要そう
    console.log("change");
    dispatch(setPlayingFlag(false));
    let res=newValue as number;
    if(res!=tarTurn) dispatch(setTarTurn(res));
    // setDisplayTurn(res);
  }
  // const handleChange = (event: Event, newValue: number | number[]) => { // TODO:後半のnumber[]は不要そう
  //   let res=newValue as number;
  //   if(res!=displayTurn) dispatch(setTarTurn(res));
  //   setDisplayTurn(res);
  // }
  // const handleChange_old = (e) => {
  //   dispatch(setPlayingFlag(false))
  //   console.log(e);
  //   dispatch(setTarTurn(e));
  //   setDisplayTurn(e);
  // }
  // DOM==============================
  console.log("SeekBar");
  return(
    <>
      <SDiv>
        {/* <Slider
          value={displayTurn}
          onChange={handleChange}
          min={0}
          max={s.length}
        /> */}
        <Slider
          value={tarTurn}
          onChange={handleChange}
          min={0}
          max={ope.length}
        />
      </SDiv>
    </>
  )
};
const SDiv = styled.div`
width:780px;
`