import React from "react";
// ビルトインフック
import { useState,useEffect,useRef } from "react";
// Redux
import { useSelector } from '../../store/store';
import { useDispatch, shallowEqual } from 'react-redux';
import { setInput } from '../../store/inputSlice';
// CSS
import styled from "@emotion/styled";
// MUI
import Stack from '@mui/material/Stack';
// 型
import type { Input_type, Output_type } from "../../types/typeFormat"

export const SpeedBar = () => {
  // useState==============================
  const [inputFPS,setInputFPS] = useState(30);
  
  // Redux==============================
  const dispatch = useDispatch();
  // useEffect==============================
  
  // Styled CSS==============================
  const SDivCenter = styled.div`
  display: flex;
  align-items: center;
  `
  const InputSpeedBar = styled.input`
  width:200px;
  `
  const SLabel = styled.label`
  width:50px;
  padding: 0px 4px;
  `

  // 関数==============================
  const onChangeHandler = function (num){
    setInputFPS(num);
  }

  // DOM==============================
  console.log("SpeedBar");
  return(
    <>
      <SDivCenter>
        <SLabel>FPS:{inputFPS}</SLabel>
        {/* <input type="range" onInput="this.nextSibling.value = this.value"/>
        <input type="text" onKeyUp="this.previousSibling.value = this.value" /> */}
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
        </datalist>
      </SDivCenter>
      {/* <SLabel>slow</SLabel>
      <InputSpeedBar type="range" id="speed" min={1} max={60} defaultValue={30}/>
      <SLabel>fast</SLabel> */}
    </>
  )
};