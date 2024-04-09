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
import type { Input_type, Output_type, Ope_type } from "../../types/typeFormat"

export const SpeedBar = () => {
  // useState==============================
  
  // Redux==============================
  const dispatch = useDispatch();
  // useEffect==============================
  
  // Styled CSS==============================
  const InputSpeedBar = styled.input`
  width:200px;
  `
  const SLabel = styled.label`
  padding: 0px 4px;
  `

  // 関数==============================
  

  // DOM==============================
  console.log("SpeedBar");
  return(
    <>
      <SLabel>slow</SLabel>
      <InputSpeedBar type="range" id="speed" min={1} max={60} defaultValue={30}/>
      {/* <InputSpeedBar type="range" id="speed" min="1" max="60" value="30" wfd-id="id14"/> */}
      <SLabel>fast</SLabel>
    </>
  )
};