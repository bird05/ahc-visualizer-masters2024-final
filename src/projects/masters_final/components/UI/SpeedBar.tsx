import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setFPS } from '../../store/tarTurnSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
// 型
import type { Input_type, Output_type } from "../../types/typeFormat"

export const SpeedBar = () => {
  // useState==============================
  // const [inputFPS,setInputFPS] = useState(10);
  // Redux==============================
  const FPS = useSelector((state) => state.tarTurn.FPS);
  const dispatch = useDispatch();
  // useEffect==============================
  
  // 関数==============================
  const handleChange = (event: Event, newValue: number | number[]) => { // TODO:後半のnumber[]は不要そう
    let res=newValue as number;
    if(res!=FPS) dispatch(setFPS(res));
    // setInputFPS(res);
  }
  // const onChangeHandler = function (num){
  //   setInputFPS(num);
  // }
  const marks = [
    {
      value: 10,
      // label: '0°C',
    },
    {value: 20},
    {value: 30},
    {value: 40},
    {value: 50},
    {value: 60},
    {value: 70},
    {value: 80},
    {value: 90},
  ];
  
  // DOM==============================
  console.log("SpeedBar");
  return(
    <>
      <SDivCenter>
        <SLabel>FPS:{FPS}</SLabel>
        <SDiv>
          <Slider
            value={FPS}
            onChange={handleChange}
            marks={marks}
            min={1}
            max={99}
          />
        </SDiv>

        {/* <SLabel>FPS:{inputFPS}</SLabel>
        <InputSpeedBar type="range" id="speed" min={1} max={99} value={inputFPS} onChange={(e) => onChangeHandler(e.target.value)} list="fps-list"/>
        <datalist id="fps-list">
          <option value={10}/>
          <option value={20}/>
          <option value={30}/>
          <option value={40}/>
          <option value={50}/>
          <option value={60}/>
          <option value={70}/>
          <option value={80}/>
          <option value={90}/>
        </datalist> */}

        {/* <input type="range" onInput="this.nextSibling.value = this.value"/>
        <input type="text" onKeyUp="this.previousSibling.value = this.value" /> */}

      </SDivCenter>
      {/* <SLabel>slow</SLabel>
      <InputSpeedBar type="range" id="speed" min={1} max={60} defaultValue={30}/>
      <SLabel>fast</SLabel> */}
    </>
  )
};
// Styled CSS==============================
const SDivCenter = styled.div`
display: flex;
align-items: center;
`
// const InputSpeedBar = styled.input`
// width:200px;
// `
const SLabel = styled.label`
width:50px;
padding: 0px 4px;
`
const SDiv = styled.div`
width:200px;
`